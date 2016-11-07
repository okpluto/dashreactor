'use strict'
/* Config.js
 *
 * This file handles connecting to the database and loads dummy data.
 **/

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI);

var connection = mongoose.connection;

connection.on('error', function() {
  console.log('Error connecting to MongoDB:')
});
connection.once('open', function() {
  console.log('Connected to MongoDB.');
});

module.exports = connection;

