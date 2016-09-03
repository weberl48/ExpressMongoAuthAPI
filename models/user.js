//User Schema for MongoDB
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
// Model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

//on save hook, encrypt password
//before saving a model, run this funciton
userSchema.pre('save', function(next) {
  //access to user model
  const user = this;

  // generate a salt then run callback (randomly generated string of characters)
  //salt + password = Salt + Hashed Password
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err);}
  //hash (encrypt) password using salt
  bcrypt.hash(user.password, salt, null , function (err, hash) {
      if (err) { return next(err) }
      //overwrite plain text password with encrypted password
      user.password = hash;
      next()
    })
  })
});


userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
}



// Model class
const ModelClass = mongoose.model('user', userSchema);
//export the model for use in app
module.exports = ModelClass
