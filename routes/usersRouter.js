//user routes
var
  express = require('express'),
  passport = require('passport'),
  usersRouter = express.Router(),
  usersController = require('../controllers/usersController.js'),
  User = require('../models/User.js')


//The root will be the login page

usersRouter.route('/signup')
  .get(usersController.new)
  .post(usersController.create)

  function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/games')
}

module.exports = usersRouter;
