var User = require('../models/User.js'),
    passport = require('passport')


module.exports = {
  //render the login view
  new: function(req, res){
    res.render('signup')
  },

  create: passport.authenticate('local-login', {
    successRedirect: '/games',
    failureRedirect: '/'
  })



}
