'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const mime = require('mime')
const fs = require('fs')

const indexPath = path.join(__dirname, '/../build/index.html')
const publicPath = express.static(path.join(__dirname, '/../build/static'))

const contentHandlers = require('./routes/content-route-handlers');
const lessonHandlers = require('./routes/lesson-route-handlers');
const userHandlers = require('./routes/user-route-handlers');
const checkAuth = require('./helpers/checkAuth');

const db = require('./data/config');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Apply headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  next();
});

// Log out requests for debug

// Serving dashreactor static files
app.use('/static', publicPath);

// Define routes
app.get('/', function (_, res) { res.sendFile(indexPath) })
app.get('/api/lessons', lessonHandlers.getAllLessons);
app.get('/api/lessons/:id', lessonHandlers.getLessonAndContentsById);
app.post('/api/lessons', lessonHandlers.createLesson);
app.put('/api/lessons/:id', lessonHandlers.updateLessonById);
app.delete('/api/lessons/:id', lessonHandlers.deleteLessonById);

app.post('/api/users/signin', userHandlers.signin);
app.post('/api/users/signup', userHandlers.createUser);
app.get('/api/users', userHandlers.getUsers);
app.get('/api/users/:id', checkAuth, userHandlers.getUserById);
app.put('/api/users/:id', userHandlers.updateUserById);
app.delete('/api/users/:id', userHandlers.deleteUserById);

app.get('/api/content/:type', contentHandlers.getContentByType);
app.get('/api/content/:id', contentHandlers.getContentById);
app.post('/api/content', contentHandlers.createContent);
app.put('/api/content/:id', contentHandlers.updateContentById);
app.delete('/api/content/:id', contentHandlers.deleteContentById);
// Let users download android app
app.get('/api/download', (req, res) => {
  let file = __dirname + '/app-release.apk';
  res.download(file)
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}.`);
});
