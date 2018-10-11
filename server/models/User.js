const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema(
   {
      name: String,
      username: String,
      password: String,
      nfid: String,
      mobile_num: String,
      email: String,
      role: String
   }
)

module.exports = mongoose.model('User', UserSchema);