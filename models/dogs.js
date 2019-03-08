const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  imageURL: {type: String, require: true},
  imageDescription: {type: String, require: true},
  name: {type: String, require: true},
  sex: {type: String, require: true},
  age: {type: String, require: true},
  breed: {type: String, require: true},
  story: {type: String, require: true}
});


module.exports = mongoose.model('Dog', schema);