//user routes
var
  express = require('express'),
  passport = require('passport'),
  usersRouter = express.Router(),
  usersController = require('../controllers/usersController.js'),
  User = require('../models/User.js')


//The root will be the login page which is set up in the server. First route from there will be signup
usersRouter.route('/')
  .get(usersController.login)
  .post(passport.authenticate('local-login', {
  successRedirect: '/games',
  failureRedirect: '/'
  }
))

usersRouter.route('/signup')
  .get(usersController.new)
  .post(passport.authenticate('local-signup', {
    successRedirect: '/games',
    failureRedirect: '/signup'
  }))

// usersRouter.route('/games')
//   .get(usersController.show)

usersRouter.get('/games', isLoggedIn, function(req, res) {
    // render the user profile
    res.render('lobby', {user: req.user})
})


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/games')
}

module.exports = usersRouter;
