const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('contact', {
    logo: 'serverify',
    pageTitle: 'Contact Page',
    contactMsg: 'Let\'s get in touch with you'
  })
})

module.exports = router