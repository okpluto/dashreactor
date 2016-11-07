const mongoose = require('mongoose');
const Lesson = require('../data/models/lesson');
const Content = require('../data/models/content');
const User = require('../data/models/user')

const ObjectId = mongoose.Types.ObjectId;

const log = require('../helpers/log');
const send500 = require('../helpers/send500');
const send404 = require('../helpers/send404');

exports.getAllLessons = (req, res) => {

  Lesson.find({}, (err, lessons) => {
    if (err) {
      log.error(err);
      return;
    }
    res.status(200).json(lessons);
  });
};

exports.getLessonAndContentsById = (req, res) => {
  const id = req.params.id;
  const result = {};

  Lesson.findById(id, (err, lessonInfo) => {
    result.lessonInfo = lessonInfo;
    result.lessonContent = [];

    Content.find({lessonId: ObjectId(id)}, (err, content) => {
      if (err) {
        send500(res, 'Error retrieving content.', err);
        return;
      }

      result.lessonContent.push(...content);
      log.success('Successfully retrieved lesson.');
      res.status(200).json(result);
    });
  });
};

exports.createLesson = (req, res) => {
  req.body.published = false;
  new Lesson(req.body)
    .save((err, lesson) => {
      if (err) {
        log.error("Rut roh~ ", err);
        send500(res, "Lesson wasn't saved correctly!!");
      } else {
        //Save the lesson id on the user
        User.update({ _id: req.body.creator }, { $push: { createdLessons: lesson._id } }, (err, user) => {
          if (err) {
            log.error(err)
          }
          log.amazing(user)
        })
        log.success("Lesson created")
        res.status(201).send(lesson._id);
      }
    });
};

exports.updateLessonById = (req, res) => {
  const id = req.params.id;
  Lesson.findById(id, function(err, lesson) {
    if (err) {
      log.error(err);
    }
    for (var key in req.body) {
      // Update average rating
      if (key === 'userRating' && !Array.isArray(req.body[key])) {
        let currRating = lesson.userRating[0]
        let numRatings = lesson.userRating[1]
        let newRating = lesson.userRating[0] === 0 ? req.body[key] :
        (currRating * numRatings + req.body[key]) / (numRatings + 1)
        lesson[key] = [newRating, ++numRatings]
      } else if (key === 'published' && req.body[key] && lesson.length < 4) {
        res.status(400).send("Lesson is too short to publish")
        return;
      } else {
        lesson[key] = req.body[key];
      }
    }
    lesson.save(function(err, updatedLesson) {
      if (err) {
        log.error(err);
      }
      res.status(200).send(updatedLesson);
    })
  });
};

exports.deleteLessonById = (req, res) => {
  const id = req.params.id;
  //TODO(Mitch): Fill me in!
};
