//user routes
var
  express = require('express'),
  passport = require('passport'),
  usersRouter = express.Router(),
  usersController = require('../controllers/usersController.js'),
  User = require('../models/User.js')


//The root will be the login page which is set up in the server. First route from there will be signup

usersRouter.route('/signup')
  .get(usersController.new)
  .post(usersController.create)

usersRouter.route('games')
  .get(usersController.show)

userRouter.get('/games', isLoggedIn, function(req, res) {
    // render the user profile
    res.render('lobby', {user: req.user})
})

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/games')
}

module.exports = usersRouter;
