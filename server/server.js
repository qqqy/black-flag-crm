require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const aCtrl = require('./authController')
const lCtrl = require('./loadController')
const sCtrl = require('./searchController')
const wCtrl = require('./awsController')
const uCtrl = require('./updateDatabaseController')
const { CONNECTION_STRING , SERVER_PORT , SESSION_SECRET , AWS_ACCESS_KEY_ID , AWS_SECRET_ACCESS_KEY ,  BUCKET_NAME } = process.env

// SETUP //

const app = express()



// MIDDLEWARE //

app.use(express.json())
app.use(session({
  secret: SESSION_SECRET ,
  resave: false ,
  saveUninitialized: false
}))
app.use( express.static( `${__dirname}/../build` ) );

// TEST ENDPOINTS //

app.get('/test/db' , async (req, res) => {
  const db = app.get('db')
  let customers = await db.testdb().catch(err => res.status(200).send(err))
  res.status(200).send(customers)
})
app.get('/test/server' , (req, res) => res.status(401).send({code: 401 , message: 'User Not Logged In'}))
app.get('/test/session' , (req, res) => res.status(200).send(req.session))
app.get('/test/bcrypt/:fake' , aCtrl.test)
app.post('/test/builder' , sCtrl.testQueryBuilder)

// FUNCTIONAL ENDPOINTS //

app.post('/auth/login' , aCtrl.login)
app.post('/auth/logout' , aCtrl.logout)

app.get('/load/display' , lCtrl.loadDisplay)
app.get('/load/:term' , lCtrl.loadTerm)
app.get('/load/:column/:table/' , lCtrl.load)

app.get('/subload/:term' , lCtrl.subload)

app.get('/target/:term' , lCtrl.targetTerm)

app.get('/search/:term' , sCtrl.searchTerm)

// INSERT AND UPDATE ENDPOINTS, FOR MAKING EDITS //

app.patch('/save/interaction' , uCtrl.saveInteraction)
app.put('/new/interaction' , uCtrl.newInteraction)
app.put('/new/ticket' , uCtrl.newTicket)
app.put('/new/customer' , uCtrl.newCustomer)

app.delete('/delete/:table/:column/:id' , uCtrl.delete)

// AWS ENDPOINT //

app.post('/upload/image' , wCtrl.uploadPicture)

// DB CONNECTION & LISTENING //

massive(CONNECTION_STRING).then(instance => {
  app.set('db' , instance)
  app.listen(SERVER_PORT , () => console.log(SERVER_PORT + ' is our port in the storm.') )
})

// TESTING EXPORTS //

exports.db = app.get('db')
