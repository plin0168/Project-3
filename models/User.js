const
  mongoose = require('mongoose'),
  bcrypt=require('bcrypt-nodejs')

// Set schema for users
  userSchema = mongoose.Schema({
    local: {
      name: {type: String},
      email: {type: String, unique: true},
      password: {type: String},
      avatar: String,
      games: [
        {game: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
        score: {type: Number, default: 0}
      }
      ]
    },
    facebook: {
      id: String,
      name: String,
      token: String,
      email: String
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

//** rehash password when edit update complete
userSchema.pre('save', function(next){
  if(!this.isModified('local.password')) return next()
  this.local.password = this.generateHash(this.local.password)
  next()
})



  // Save the schema as a model
  const User = mongoose.model('User', userSchema)

  module.exports = User
