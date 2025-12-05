const mongoose = require('mongoose');

const puppySchema = new mongoose.Schema({
  name: { type: String, required: true },
  puppyPower: { type: String, required: true },
  bestFriend: { type: String, required: true },
  birthYear: { type: Number, required: true },
  imageLink: { type: String, required: true }
});

module.exports = mongoose.model('Puppy', puppySchema);
