const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  amount:{
    type:Number
  },
  regdate: {
    type: Date,
    required: true
  },
  busdate: {
    type: Date,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  pnr : {
    type:String,
    required: true
  },
  mobileNumber : {
    type:Number,
    required: true
  }
  // Add more fields as needed
});

const ticket = mongoose.model('ticket', ticketSchema);

module.exports = ticket;
