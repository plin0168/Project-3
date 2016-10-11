var
  express = require('express'),
  passport = require('passport'),
  gamesRouter = express.Router(),
  gamesController = require('../controllers/gamesController.js'),
  User = require('../models/Game.js')

/////////Garrett you can use this to create games////////
// gamesRouter.route('/games/new')
//   .get(gamesController.new)
//   .post(gamesController.create)
//
// ////////Game view///////////
//
gamesRouter.route('/game/:id')
  .get(gamesController.show)
