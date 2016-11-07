const mongoose = require('mongoose');

/* Data type: Content
 *
 * This represents lessons. Boggles the mind, right?
 *
 * They may seem minimal but currently the burden of knowing which lesson a
 * piece of content belongs to is placed upon the content. See the comment in
 * `content.js` for reference.
 *
 * Could benefit from storing a hyperlink to an icon, or an icon name for the
 * LessonTitleCardList
 *
 * @title: <String>
 *  The title of the lesson.
 * @description: <String>
 *  A blurb which describes the lesson.
 */

const lessonSchema = mongoose.Schema({
  title: {type: String, index: {unique: true}},
  description: String,
  difficultyRating: Number,
  //First num in array is rating, 2nd num is total # of user ratings
  //for calculating average
  userRating: {type: Array, default: [0,0]},
  category: String,
  published: {type: Boolean, default: false},
  creator: mongoose.Schema.Types.ObjectId,
  length: {type: Number, default: 0}
});

const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;