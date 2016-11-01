##Dash Reactor

Dash Reactor is the web companion to the Scripty mobile app. It is intended to give the app's lesson planners an easy way to update and create lessons for Scripty without having to interact with the code directly.

It was built using React 15.3.2 and styled with React Bootstrap 0.30.5.

#Getting started
You'll need Node and npm installed on your computer.
npm install should install all other necessities.
Initialize the program in your terminal with 'npm start' from the project's root directory, then navigate to localhost:3000 in your browser to access the app.

#Project Organization
The Navbar, Lesson Title List, Question Title List, and newQuestion/Question detail panels are rendered in App.js as siblings. App.js is appended to the DOM in index.js.

Lesson titles and Question titles are rendered from inside their respective lists.

The currently selected lessons/lesson title/questions are held in App.js's state. Most event handlers are in App.js as well.

The exception is QuestionDetail. Because we need to be able to add, alter and display answer choices as editable inputs, an array of the original choices is saved in QuestionDetail.js's own state, along with the event handler (addChoice) to add any new options.


#Style
Deconstruct where possible.
Modularize your code as much as possible.
Please check Scripty's style guide for more information on style.


#Optional: Suggestions for moving forward

1. Hook up to Scripty's database and instead of dummy data,
  a. GET live lesson data
  b. PUT updates (corrections or new questions on existing lessons)
  c. POST new lessons

2. Fix bug - prevent NewQuestion and QuestionDetails from rendering at the same time.

3. Add event handlers to App to save edited content in NewQuestion/QuestionDetails.

4. Once Users are implemented on database, remove hard coding to lessonTitleList component

5. Restyle to remove bootstrap responsive sizing

6. Enable adding new input lines in NewQuestion.js (as it is in QuestionDetail.js)

7. Build out new tests - npm start runs tests..


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
For more information please check out the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
