var
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  configAuth = require('./auth.js'),
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
}, function(req, email, password, done){
  User.findOne({'local.email': email}, function(err,user){ //creating error possibility
    //if there is a problem
    if(err) return done(err)
    //check password length
    if(password.length < 5) return done(null, false, req.flash('signupMessage', 'please make sure your password is more than 5 characters.'))
    //if email user is taken
    if(user){
      console.log("there's already a username");
      return done(null,false, req.flash('signupMessage', 'This email is already taken. Please check and try again.'))
    }

    //create newUser is above doesnt happen
    var newUser = new User()
    newUser.local.name = req.body.name
    newUser.local.email = email
    newUser.local.password = newUser.generateHash(password)
    newUser.save(function(err){
      if(err) throw err
      done(null, newUser)
    })
  })
}))

//creating local log in:
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req,email,password,done){
  //makesure that user exists by searching through DB:
  User.findOne({'local.email':email}, function(err,user){
    if(err) return done(err)
    //no user email found, flash would say so
    if(!user) { return done (null, false)}
    //passworld invalid
    if(!user.validPassword(password)) return done(null, false)

    return done(null,user)
  })
}))


//facebook login add in:
passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: configAuth.facebookAuth.profileFields
}, function(token,refreshToken,profile,done){
    User.findOne({'facebook.id': profile.id}, function(err, user){
        if(err) return done(err)
        if(user){
            return done(null, user)
        } else {
            var newUser = new User()
            newUser.facebook.id = profile.id
            newUser.facebook.token = token
            newUser.facebook.name = profile.displayName
            newUser.facebook.email = profile.emails[0].value

            newUser.save(function(err){
                if(err) throw err
                return done(null,newUser)
            })
        }
    })
}))



module.exports = passport
