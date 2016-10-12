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
      Game.findById(req.params.id,function(err, game){
        game.rounds.forEach(function(el){
          var picId = []
          var pics = game.rounds[game.rounds.length-1].pics
          for(i=0;i<pics.length; i++){
            picId.push(pics[i].user)
          console.log(el.pics);
          var library = el.pics
          library.forEach(function(pic){
            console.log(pic.url)
          })
        })
        res.render('photo-library.ejs', { pic: pic})
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
