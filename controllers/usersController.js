var User = require('../models/User.js'),
    passport = require('passport')


module.exports = {
  //render login view
  login: function(req, res){
    res.render('login')
  },

  createSession: function(){passport.authenticate('local-login', {
    successRedirect: '/games',
    failureRedirect: '/'
<<<<<<< HEAD
  }),
=======
  })},
>>>>>>> b5819e3a090c7aa83ed7fdce0253286c0515762c


  //render the signup view
  new: function(req, res){
    res.render('signup')
  },

  createUser: function(){passport.authenticate('local-signup', {
    successRedirect: '/games',
    failureRedirect: '/signup'
  })}



}
