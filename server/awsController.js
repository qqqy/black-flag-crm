require('dotenv').config()
const AWS = require('aws-sdk')
const bluebird = require('bluebird')
const fs = require('fs')
const fileType = require('file-type')
const multiparty = require('multiparty')
const { AWS_ACCESS_KEY_ID , AWS_SECRET_ACCESS_KEY ,  BUCKET_NAME } = process.env

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID ,
  secretAccessKey: AWS_SECRET_ACCESS_KEY ,
})

AWS.config.setPromisesDependency(bluebird)

const s3 = new AWS.S3()

const uploadFile = (buffer, name, type) => {
  const params = {
    ACL: 'public-read' ,
    Body: buffer ,
    Bucket: BUCKET_NAME ,
    contentType: type.mime ,
    Key: `${name}.${type.ext}`
  }
  return s3.upload(params).promise()
}

module.exports = {
  uploadPicture: (req , res ) => {
    const form = new multiparty.Form();
      form.parse(req, async (error, fields, files) => {
        if ( error ) throw new Error(error);
        try {
          const path = files.file[0].path
          const buffer = fs.readFileSync(path)
          const type = fileType(buffer)
          const timestamp = Date.now().toString()
          const fileName = `blackFlagImages/${timestamp}-lg`
          const data = await uploadFile(buffer , fileName , type)
          // Switching Over to Updating the DB //
          const db = req.app.get('db')
          console.log(data.Key , req.session)
          let agent = await db.new_picture({key: data.Key , id: req.session.agent.agent_id})
          req.session.agent = agent[0]
          return res.status(200).send({...data , agent: agent[0]})
        } catch (error) {
          console.log(error)
          return res.status(400).send(error)
        }
      })
  }
}