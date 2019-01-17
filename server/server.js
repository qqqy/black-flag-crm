require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const aCtrl = require('./authController')
const lCtrl = require('./loadController')
const sCtrl = require('./searchController')
const { CONNECTION_STRING , SERVER_PORT , SESSION_SECRET } = process.env

const app = express()

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

// DB CONNECTION & LISTENING //

massive(CONNECTION_STRING).then(instance => {
  app.set('db' , instance)
  app.listen(SERVER_PORT , () => console.log(SERVER_PORT + ' is our port in the storm.') )
})
