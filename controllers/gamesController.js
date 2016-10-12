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
      var library;
      Game.findById(req.params.id,function(err, game){
        game.rounds.forEach(function(el){
          console.log(el.pics);
          library = el.pics
          library.forEach(function(pic){
            console.log(pic.url)
          })
        })
        res.json(library)
        res.render('photo-library.ejs', {title:"photo library uploads"})
        if(err) throw err
  })
},

    show: function(req, res){
      Game.findById(req.params.id, function(err, game){
        if(err) return console.log(err)
        console.log(game)
        res.json(game)
      })
    }
}
