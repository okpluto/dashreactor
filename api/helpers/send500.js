const log = require('./log');

module.exports = (res, message = 'Something went wrong!') => {
  log.error(message);
  res.status(500).send(message);
};