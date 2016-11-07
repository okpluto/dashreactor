const mongoose = require('mongoose');
const Content = require('../data/models/content');
const Lesson = require('../data/models/lesson');
const ObjId = mongoose.Types.ObjectId;

const log = require('../helpers/log');
const send500 = require('../helpers/send500');
const send404 = require('../helpers/send404');

exports.getContent = (req, res) => {

};

exports.getContentById = (req, res) => {
  const id = req.params.id;
};

exports.getContentByType = (req, res) => {
  const type = req.params.type;
};

exports.createContent = (req, res) => { //creating a question!
  Lesson.findByIdAndUpdate({ _id: req.body.lessonId }, {$inc: {length:1}}, function (err, data) {
    console.log('Lesson data: ', data); //note, old data is given
    //This will check if the new question needs to be inserted or added onto the end
    if (req.body.order < data.length) {
      //because we'll need to increment their order by 1
      Content.find({ "lessonId": data._id, "order": { $gte: req.body.order}})
        .exec(function(err, results) {
          results.forEach(function(question) {
          	Content.findByIdAndUpdate({ _id: question._id }, {$inc: {order:1}}, function(err, data) {
          		log.error(err);
          		console.log("Updated content ", data);
          	})
          })
        })

    }
    //no insertion needed
    new Content(req.body)
      .save((err, content) => {
	      if (err) {
	        log.error("Uh oh: ", err);
	        send500(res, "Content wasn't created correctly!!");
	      }
	      console.log("This is the content: ", content);
	      res.status(201).send(content);
	    });
  });

};

exports.updateContentById = (req, res) => {
  const id = req.params.id;
  Content.findById(id, function(err, content) {
  	if (err) {
  		log.error(err);
  	}
  	console.log("CONTENT ", content);
  	for (var key in req.body) {
      content[key] = req.body[key];
  	}
  	content.save(function(err, updatedContent) {
  		if (err) {
  			log.error(err);
  		}
  		res.status(200).send(updatedContent);
  	})
  });
};

exports.deleteContentById = (req, res) => {
  const id = req.params.id;
};