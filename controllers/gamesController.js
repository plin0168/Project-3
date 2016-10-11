var Game = require('../models/Game.js'),
    passport = require('passport')
//
//
module.exports = {
//   new: function(req, res){
//     res.render('')
//   },
//
    show: function(req, res){
      Game.findById(req.params.id, function(err, game){
        res.render('game-player', {game: game})
      })
    }
}
