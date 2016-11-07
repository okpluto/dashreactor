'use strict'

module.exports = (res, message) => {

  res.status(404).send(message);
};