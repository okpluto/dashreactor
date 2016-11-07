const jwt = require('jwt-simple');
const User = require('../data/models/user');


const checkAuth = (req, res, next) => {
  var token = req.headers.authorization;
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'scriptyyyy');
      if (user) {
        next()
      } else {
        res.send(401)
      }
    }
}


module.exports = checkAuth;