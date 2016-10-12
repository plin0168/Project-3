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
  Game.findById(req.params.id).populate('users').exec(function(err, game){
    if(req.user.id == game.rounds[game.rounds.length-1].picker){
      res.render('game-picker', {game: game})
    } else{
      res.render('game-player', {game: game})
    }
  })
  // Game.findById(req.params.id, function(err, game){
  //   if(err) return console.log(err)
  //   console.log(game)
  //   res.json(game)
  // })
})

gamesRouter.patch('/game/:id/new_photo', function(req, res){
  Game.findById(req.params.id, function(err, game){
    var currentRound = game.rounds[game.rounds.length - 1]
    currentRound.pics.push(req.body)
    game.save(function(err, game) {
      res.json(game)
    })
  })
})

gamesRouter.get('/game/:id/photos', function(req, res){
  Game.findById(req.params.id, function(err, game){
    var currentRound = game.rounds[game.rounds.length - 1]
    console.log(currentRound.pics)
    res.json(currentRound.pics)
  })


})


module.exports = gamesRouter
