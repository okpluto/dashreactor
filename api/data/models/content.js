const mongoose = require('mongoose');

/* Data type: Content
 *
 * Covers the range of content held within lessons: questions, readings, slides,
 * videos, recipes, etc.
 *
 * This datatype is a starting point, and the only fields that are considered
 * *required* are `order` and `lessonId`. Afterall, content is nothing without
 * a lesson. This could change with cirriculum restructuring but the data type
 * is purposefully left flexible to reflect this. Praise be to mongo for
 * allowing this lack of discipline.
 *
 * @order: <Number>
 *  Represents the order the content appears in the given lesson.
 * @type: <String> ('reading', 'question' currently supported)
 *  The `type` of content.
 * @choices: [<String>]
 *  If the content is a question or otherwise requires confirmation from the
 *  user, this represents the choices the user can make.
 * @answer: <String>
 *  The choice from the `choices` array which represents the correct answer.
 * @lessonId: <ObjectId>
 *  The reference id of the lesson which holds the content.
 **/

const contentSchema = mongoose.Schema({
  order: {type: Number, default: 0},
  type: String,
  name: String,
  text: String,
  choices: [String],
  answer: String,
  lessonId: mongoose.Schema.Types.ObjectId
});

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;