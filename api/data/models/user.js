const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
var SALT_WORK_FACTOR = 10;

/* Data type: User
 *
 * Not currently developed. May need to accomidate lesson progress and achieve-
 * ments. Not to mention password encryption.
 *
 * @name: <String>
 *  The user's username.
 * @email: <String>
 *  The user's email.
 * @password: <String>
 *  Believe it or not: it's the user's password.
 **/
let today = new Date()
let day = today.getDay()
 day = 0
const userSchema = mongoose.Schema({
  name: String,
  password: String,
  email: {type: String, index: {unique: true}},
  lessons: [],
  createdLessons: [],
  lastLessonDate: {type: Date, default: today},
  streak: {type: [String], default: [day.toString()]},
  salt: String
});


userSchema.methods.comparePassword = (password, userPassword, next) => {
  bcrypt.compare(password, userPassword, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    next(null, isMatch);
  })
};


userSchema.pre('save', function (next) {
  var user = this;

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      // override the cleartext password with the hashed one
      user.password = hash;
      user.salt = salt;

      next();
    });

  });
});

const User = mongoose.model('User', userSchema);


module.exports = User;