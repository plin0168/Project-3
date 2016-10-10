const
  mongoose = require('mongoose')

// Set schema for users
  userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: String,
    games: [
      {type: mongoose.Schema.Types.ObjectId, ref: 'Game'}
    ]
  },
  {
    timestamps: true
  }
  // end of model
  )

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.local.password)
}
  // Save the schema as a model
  const User = mongoose.model('User', userSchema)

  module.exports = User
