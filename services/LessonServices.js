var Promise = require('bluebird');


const getLessons = function () {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'http://localhost:3011/api/lessons/',
      type: 'GET',
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

module.exports = {
  getLessons: getLessons,
  getLessonById: getLessonById,
  addLesson: addLesson
};