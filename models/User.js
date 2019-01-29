const mongoose = require('mongoose');
// const {Schema} = mongoose;   Same thing as below
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});

mongoose.model('users', userSchema);
