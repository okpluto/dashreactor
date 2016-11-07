/* Config.js
 *
 * This file handles connecting to the database and loads dummy data.
 **/

var mongoose = require('mongoose');
var log = require('../helpers/log');

mongoose.connect('mongodb://localhost/scripty');

var connection = mongoose.connection;

connection.on('error',
  log.error.bind(null, 'Error connecting to MongoDB:'));
connection.once('open', function() {
  log.info('Connected to MongoDB.');
});

module.exports = connection;

// Import dummy data provided by dummy-data/index.js
// For debug and testing purposes only
var dummyData = require('./dummy-data');