var
  express = require('express'),
  passport = require('passport'),
  gamesRouter = express.Router(),
  gamesController = require('../controllers/gamesController.js'),
  Game = require('../models/Game.js'),
  User = require('../models/User.js')

/////////Garrett you can use this to create games////////
// gamesRouter.route('/games/new')
//   .get(gamesController.new)
//   .post(gamesController.create)
//
// ////////Game view///////////
//
gamesRouter.get('/game/:id', function(req, res){
  console.log("hello")
  Game.findById(req.params.id, function(err, game){
    res.render('game-player', {game: game})
  })
  // Game.findById(req.params.id, function(err, game){
  //   if(err) return console.log(err)
  //   console.log(game)
  //   res.json(game)
  // })
})

gamesRouter.patch('/game/:id/new_photo', function(req, res){
  Game.findByIdAndUpdate(req.params.id, req.params.body, {new:true}, function(err, game){
    console.log(req.params.body)
    res.json(game)
  })
})


module.exports = gamesRouter
