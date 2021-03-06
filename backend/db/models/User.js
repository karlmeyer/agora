var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
  
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  groups: {
    type: Array,
    required: false
  }
});


// Bcrypt middleware on UserSchema
userSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) next(err);

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        next(err);
      } else {
      user.password = hash;
      next();
      }
    });
  });
});

//Password verification
userSchema.methods.comparePassword = function(pass, cb) {
  bcrypt.compare(pass, this.password, function(err, isMatch) {
    if (err) {
      cb(err);
    } else {
      cb(null, isMatch);
    }
  });
};

module.exports = mongoose.model('User', userSchema);
