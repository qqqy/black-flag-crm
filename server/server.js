require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const AWS = require('aws-sdk')
const bluebird = require('bluebird')
const fs = require('fs')
const fileType = require('file-type')
const multiparty = require('multiparty')
const aCtrl = require('./authController')
const lCtrl = require('./loadController')
const sCtrl = require('./searchController')
const { CONNECTION_STRING , SERVER_PORT , SESSION_SECRET , AWS_ACCESS_KEY_ID , AWS_SECRET_ACCESS_KEY ,  BUCKET_NAME } = process.env

// SETUP //

const app = express()

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

// MIDDLEWARE //

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET ,
  resave: false ,
  saveUninitialized: false
}))

// TEST ENDPOINTS //

app.get('/test/db' , async (req, res) => {
  const db = app.get('db')
  let customers = await db.testdb().catch(err => res.status(200).send(err))
  res.status(200).send(customers)
})
app.get('/test/server' , (req, res) => res.sendStatus(200))
app.get('/test/session' , (req, res) => res.status(200).send(req.session))
app.get('/test/bcrypt/:fake' , aCtrl.test)
app.post('/test/builder' , sCtrl.testQueryBuilder)

// FUNCTIONAL ENDPOINTS //

app.post('/auth/login' , aCtrl.login)
app.post('/auth/logout' , aCtrl.logout)

app.get('/load/display' , lCtrl.loadDisplay)
app.get('/load/:term' , lCtrl.loadTerm)
app.get('/target/:term' , lCtrl.targetTerm)

app.get('/search/:term' , sCtrl.searchTerm)

app.post('/upload/image' , (req , res ) => {
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
        return res.status(200).send(data)
      } catch (error) {
        return res.status(400).send(error)
      }
    })
})

// DB CONNECTION & LISTENING //

massive(CONNECTION_STRING).then(instance => {
  app.set('db' , instance)
  app.listen(SERVER_PORT , () => console.log(SERVER_PORT + ' is our port in the storm.') )
})
