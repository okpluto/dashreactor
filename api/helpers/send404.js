

module.exports = (res, message = 'Not found.') => {

  res.status(404).send(message);
};