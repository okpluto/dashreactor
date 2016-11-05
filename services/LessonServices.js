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

const addLesson = function (lesson) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3011/api/lessons/',
      type: 'POST',
      success: resolve,
      error: reject
    });
  })
}

const updateLesson = function (lesson) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3011/api/lessons/',
      type: 'PUT',
      success: resolve,
      error: reject
    });
  })
}

module.exports = {
  getLessons: getLessons,
  getLessonById: getLessonById
};