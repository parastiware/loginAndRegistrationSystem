const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username });
  };

const User = mongoose.model('User', userSchema);

module.exports = User;
