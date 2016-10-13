var Game = require('../models/Game.js'),
    passport = require('passport')
//
//
module.exports = {
//   new: function(req, res){
//     res.render('')
//   },

//photo library index
    index: function(req,res){
      // var library;
      Game.findById(req.params.id, function(err, game){
        console.log()
        if(err) throw err

        var pics = []
        for(var i=0; i<game.rounds.length - 1;i++) {
            game.rounds[i].pics.forEach(function(p){
                pics.push(p)
            })
          }
        res.render('photo-library.ejs', {pics: pics, game: game})
  })
},

    show: function(req, res){
      Game.findById(req.params.id, function(err, game){
        if(err) return console.log(err)
        console.log(game)
        res.json(game)
      })
    },

    addComment: function(req, res){
      Game.findById(req.params.id,function(err, game){
        game.rounds.forEach(function(r){
          r.pics.forEach(function(p){
            if(p._id = req.body.picId){
              picOfIntent = p
            }
          })
        })
      })
      console.log(p)
      res.json(p)
    }

}
