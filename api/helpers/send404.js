const log = require('./log');

module.exports = (res, message = 'Not found.') => {
  log.error(message);
  res.status(404).send(message);
};