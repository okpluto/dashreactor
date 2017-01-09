var Promise = require('bluebird');


const getUser = function (auth) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `api/users/${auth.id}`,
      type: 'GET',
      headers: {
        'Authorization': auth.jwt
      },
      success: resolve,
      error: reject
    });
  });
};

module.exports = {
  getUser: getUser
};