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
    res.render('new_game', {game: game})
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

//edit update set-up 
  usersRouter.use(isLoggedIn)

  usersRouter.patch('/games', function(req,res){
  User.findById(req.user._id, function(err,user){
    if (err) return console.log(err)
    for(key in req.body.local){
      if(req.body.local[key] !="") user.local[key] = req.body.local[key]
    }
    user.save(function(err){
        res.redirect('/games')
    })
  })
})
//edit update profile *
usersRouter.get('/games/edit', function(req,res){
  res.render('editProfile', {message: req.flash('editProfileMessage')})
})




//routes facebook authenticate
usersRouter.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}))

usersRouter.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}))

module.exports = usersRouter;
