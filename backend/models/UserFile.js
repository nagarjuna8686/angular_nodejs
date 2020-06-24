const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema
let userFileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String
  },
  avatar: {
    type: String
  },
}, {
    collection: 'userFile'
  })

module.exports = mongoose.model('UserFile', userFileSchema)