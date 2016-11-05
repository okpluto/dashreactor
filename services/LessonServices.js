var Promise = require('bluebird');


const getLessons = function (jwt) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3011/api/lessons/',
      type: 'GET',
      headers: {
        'authorization': jwt
      },
      success: resolve,
      error: reject
    });
  });
};

const getLessonById = function (lessonId) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `http://localhost:3011/api/lessons/${lessonId}`,
      type: 'GET',
      success: resolve,
      error: reject
    });
  });
};

module.exports = {
  getLessons: getLessons,
  getLessonById: getLessonById
};