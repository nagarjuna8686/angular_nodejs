const mongoose = require("mongoose");
const { boolean } = require("@hapi/joi");
const schema=mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
    unique:true
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6,
  },
  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "supervisor", "admin"]
   },
  date: {
    type: Date,
    default: Date.now(),
  },

  
},{
        collection: 'register', 
});

module.exports=mongoose.model('User',userSchema);
