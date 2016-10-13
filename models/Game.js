const
  mongoose = require('mongoose')

  // Set schema for games
    gameSchema = mongoose.Schema({
      name: {type: String, required: true},
      current_round: {type: Number},
      users: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
      rounds: [
        { round: Number,
          picker: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
          word: String,
        // end of picker object

          pics: [
            {
              user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
              url: String,
              comment: [
                {body: {type: String},
                user: {type: String}
              }
              ]
            }
          ]
        }
      ],
      // end of rounds array
      winners: [
        {
          user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
          url: String
        }
      ]
      },
      {
        timestamps: true
      }
      // end of model
    )

  // Save the schema as a model
  const Game = mongoose.model('Game', gameSchema)

  // make the model available wherever it is needed
  module.exports = Game
