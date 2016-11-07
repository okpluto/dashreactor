var Promise = require('bluebird');


const saveQuestion = function (question) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3011/api/content/',
      type: 'POST',
      data: question,
      success: resolve,
      error: reject
    });
  });
};

module.exports = {
	saveQuestion: saveQuestion
}