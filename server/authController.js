const bcrypt = require('bcryptjs')

module.exports = {
  test(req, res){
    const salt = bcrypt.genSaltSync(10)
    const fakey = bcrypt.hashSync(req.params.fake , salt)
    res.status(200).send(fakey)
  } ,

  async login (req, res){
    const { email , password } = req.body
    const db = req.app.get('db')
    const isRegistered = await db.login({ email }).catch(err => res.status(200).send(err))
    if(!isRegistered[0] || !bcrypt.compareSync(password , isRegistered[0].agent_hash)){return res.status(401).send({message: 'Incorrect Username or Password'})}
    req.session.agent = isRegistered[0]
    res.status(200).send({...isRegistered[0], agent_hash: true})
  } ,

  async logout (req, res){
    if(req.session.agent){
      req.session.destroy()
      res.status(200).send({message: 'Agent Logged Off'})
    } else {
      res.status(200).send({message: 'No Active Session'})
    }
  }
}