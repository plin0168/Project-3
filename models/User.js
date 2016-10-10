const
  mongoose = require('mongoose'),
  bcrypt=require('bcrypt-nodejs')

// Set schema for users
  userSchema = mongoose.Schema({
    local: {
      name: {type: String, required: true},
      email: {type: String, required: true, unique: true},
      password: {type: String, required: true},
      avatar: String,
      games: [
        {game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
        score: {type: Number, default: 0}
      }
      ]
    }
  },

  {
    timestamps: true
  }
)
  // end of model

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}
  // Save the schema as a model
  const User = mongoose.model('User', userSchema)

  module.exports = User
