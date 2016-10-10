var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('../models/User.js')

//creating session for cookie, does login
passport.serializeUser(function(user,done){
  done(null, user.id)
})

//takes cookie, translate, find id, find user with id, go to user page
passport.deserializeUser(function(id,done){
  User.findById(id, function(err,user){
    done(err,user)
  })
})

//PASSPORT LOCAL Strategy

//local sign-up
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req,email, password, done){
  User.findOne({'local.email': email}, function(err,user){ //creating error possibility
    //if there is a problem
    if(err) return done(err)
    //check password length
    if(password.length < 5) return done(null, false, req.flash('signupMessage', 'please make sure your password is more than 5 characters.'))
    
  })
}))
