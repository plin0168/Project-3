//user routes
var
  express = require('express'),
  passport = require('passport'),
  usersRouter = express.Router(),
  usersController = require('../controllers/usersController.js'),
  User = require('../models/User.js'),
  Game = require('../models/Game.js')


//The root will be the login page which is set up in the server. First route from there will be signup
usersRouter.route('/')
  .get(usersController.login)
  .post(passport.authenticate('local-login', {
  successRedirect: '/games',
  failureRedirect: '/'
}))


usersRouter.route('/signup')
  .get(usersController.new)
  .post(passport.authenticate('local-signup', {
    successRedirect: '/games',
    failureRedirect: '/signup'
  }))

usersRouter.get('/games', isLoggedIn, function(req, res) {
    res.render('lobby', {user: req.user})
    console.log(req.user);
})

// Route to create new game
usersRouter.post('/games/new', function(req, res){
  Game.create({
    name: req.body.name,
    users: [req.user.id, req.body.user2email, req.body.user3email, req.body.user4email, req.body.user5email, req.body.user6email]
  }, function(err, game){
    res.redirect('/game/'+game.id)
    // res.render('new_game', {game: game})
    console.log(game)
  })
})

usersRouter.get('/logout', function(req, res){
     //destroy the session and redirect to home page
     req.logout()
     res.redirect('/')
   })


function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) return next()
  res.redirect('/games')
}


//routes facebook authenticate
usersRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

usersRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))

module.exports = usersRouter;
