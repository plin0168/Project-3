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
  
}))
