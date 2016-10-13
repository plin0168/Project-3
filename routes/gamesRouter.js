var
  express = require('express'),
  passport = require('passport'),
  gamesRouter = express.Router(),
  gamesController = require('../controllers/gamesController.js'),
  Game = require('../models/Game.js'),
  User = require('../models/User.js'),
  randomWord = require('../words')

/////////Garrett you can use this to create games////////
// gamesRouter.route('/games/new')
//   .get(gamesController.new)
//   .post(gamesController.create)
//
// ////////Game view///////////
//
gamesRouter.route('/game/:id/library')
  .get(gamesController.index)


gamesRouter.get('/game/:id', function(req, res){
  Game.findById(req.params.id).populate("users rounds.picker winners.user").exec(function(err, game){
    if(err) throw err;
    console.log(game)
    // logic for stopping player for selecting multiple pictures
    var picId = []
    var pics = game.rounds[game.rounds.length-1].pics
    for(i=0;i<pics.length; i++){
      picId.push(pics[i].user)

    }
    console.log("Console log below:");
    console.log(game.rounds[game.rounds.length-1].pics);
    if(req.user.id == game.rounds[game.rounds.length-1].picker._id){
      res.render('game-picker', {game: game, picId: picId})
      console.log();
    } else{
      res.render('game-player', {game: game, picId: picId})
      console.log();
    }
  })
})
// Why doesn't this work!!!!!
// gamesRouter.delete('/game/:id', function(req, res){
//   console.log(req.params.id);
//   Game.findByIdAndRemove({req.params.id}, function(err, game){
//     res.json(game)
//   })
// })


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

gamesRouter.patch('/game/:id/new_round', function(req, res){
  Game.findById(req.params.id, function(err, game){
    game.rounds.push(req.body)
    game.rounds[game.rounds.length - 1].word = randomWord[Math.floor((Math.random() * (randomWord.length - 1)) + 1)]
    game.save(function(err, game) {
      res.json(game)
    })
  })
})

gamesRouter.patch('/game/:id/winner', function(req, res){
  Game.findById(req.params.id, function(err, game){
    game.winners.push(req.body)
    game.save(function(err, game) {
      res.json(game)
    })
  })
})

gamesRouter.get('/game/:id/members', function(req, res){
  Game.findById(req.params.id).populate("users").exec(function(err, game){
    if(err) return console.log(err)
    res.render('members-page', {game: game})
  })
})




module.exports = gamesRouter
