var Promise = require('bluebird');


const getLessons = function (jwt) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'api/lessons/',
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
      url: `api/lessons/${lessonId}`,
      type: 'GET',
      success: resolve,
      error: reject
    });
  });
};

const addLesson = function (lesson) {
  lesson.creator = JSON.parse(localStorage.getItem('userAuth')).id;
  console.log(lesson)
  return new Promise((resolve, reject) => {
    $.ajax({
      url: 'api/lessons/',
      type: 'POST',
      data: lesson,
      success: resolve,
      error: reject
    });
  })
}

const updateLesson = function (lesson) {
  let lessonId = lesson.lessonId;
  console.log(lesson);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `api/lessons/${lessonId}`,
      type: 'PUT',
      data: lesson,
      success: resolve,
      error: reject
    });
  })
}

const publishLesson = function (lesson) {
  let lessonId = lesson.lessonInfo._id;
  lesson.lessonInfo.published = true;
  console.log(lessonId)
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `api/lessons/${lessonId}`,
      type: 'PUT',
      data: lesson.lessonInfo,
      success: resolve,
      error: reject
    });
  })
}

module.exports = {
  getLessons: getLessons,
  getLessonById: getLessonById,
  addLesson: addLesson,
  updateLesson: updateLesson,
  publishLesson: publishLesson
};