

module.exports = (res, message = 'Something went wrong!') => {

  res.status(500).send(message);
};