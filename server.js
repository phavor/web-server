const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 3000

const homeRoutes = require('./routes/homeRoute')
const aboutRoute = require('./routes/aboutRoute')
const contactRoute = require('./routes/contactRoute')

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

// middlewares
app.use((req, res, next) => {
  let now = new Date().toString()
  let log = `${now}: ${req.method} : ${req.url}`

  // console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  })
  next()
})

// Run this only in maintenance mode
// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

// register helpers
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

// basic routes
app.use('/', homeRoutes)
app.use('/about', aboutRoute)
app.use('/contact', contactRoute)

app.get('/bad', (req, res) => {
  res.send({
    error: 'Your request was bad'
  })
})

app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})

module.exports.app = app