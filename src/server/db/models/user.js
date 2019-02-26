const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  boardType: {
    type: String,
    required: true,
  },
  tasks: [],
})


module.exports = mongoose.model('User', userSchema)
