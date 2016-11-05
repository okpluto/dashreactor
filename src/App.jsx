import React, { Component } from 'react';
import Navbar from './Navbar';
import LessonTitleList from './LessonTitleList';
import QuestionTitleList from './QuestionTitleList';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import NewLesson from './NewLesson';
import Signin from './Signin'
import { Row } from 'react-bootstrap';
import { getLessons, getLessonById } from '../services/LessonServices.js';
import { getUser } from '../services/userServices.js'


class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedLesson: null,
      selectedLessonQuestions: null,
      selectedLessonTitle: null,
      selectedQuestion: null,

      //determines whether 'NewQuestion' is visible.
      creatingQuestion: false,
      creatingLesson: false,

      //pulled from DB on authentication
      loggedIn: false,
      userLessons: null
    }
    this.checkLogin = this.checkLogin.bind(this)
    this.checkLogin()
  }

  checkLogin() {
    let self = this
    if (localStorage.getItem('userAuth')) {
      const auth = JSON.parse(localStorage.getItem('userAuth'));
      getUser(auth)
      .then(lessons => {
        self.setState({loggedIn: true, userLessons: lessons.createdLessons})
      })
    } else {
      if (self.state.loggedIn) {
        self.setState({loggedIn: false})
      }
    }
  }

  handleLessonClick (lesson) {
    if (this.state.selectedLesson && this.state.selectedLesson.title === lesson.title) {
      this.setState({
        selectedLesson: null,
        selectedLessonTitle: null,
        creatingLesson:false,
        selectedQuestion: null,
        selectedLessonQuestions: null,
      })
    } else {
      this.setState({
        selectedLesson: lesson,
        selectedLessonQuestions: lesson.lessonContent,
        selectedLessonTitle: lesson.title,
        creatingLesson: false
      });
    }

  }

  handleAddLessonClick (lesson) {
    this.setState({
      creatingLesson: true,
      selectedLesson: null,
      selectedLessonTitle: null
    });
  }

  handleQuestionClick (question) {
    if (this.state.selectedQuestion === question) {
      this.setState({
        selectedQuestion: null,
        creatingQuestion: false
      })
    } else {
      this.setState({
        selectedQuestion: question,
        creatingQuestion: false
      })
    }

  }

//enables appearance of question-creation form (NewQuestion.js)
  handleAddQuestionClick (question) {
    this.setState({
      creatingQuestion: true,
      selectedQuestion: null
    });
  }

//at the moment this just clears the NewQuestion form without saving.
  handleSaveNewQuestionClick () {
    this.setState({creatingQuestion: false});
  }

  renderNewQuestion() {
    if (this.state.creatingQuestion) {
      return <NewQuestion handleSaveNewQuestionClick={this.handleSaveNewQuestionClick.bind(this)}/>
    }
  }

  renderNewLesson(){
    if (this.state.creatingLesson) {
      return <NewLesson handleSaveNewLessonClick={this.handleSaveNewQuestionClick.bind(this)}/>
    }
  }

  handleSaveNewLessonClick () {
    this.setState({creatingLesson: false});
  }

  renderQuestionList () {
    if (this.state.selectedLesson) {
      return (
        <QuestionTitleList
          title={this.state.selectedLessonTitle}
          lessonContent={this.state.selectedLessonQuestions}
          selectedQuestion={this.state.selectedQuestion}
          handleQuestionClick={this.handleQuestionClick.bind(this)}
          handleAddQuestionClick={this.handleAddQuestionClick.bind(this)}
        />
      )
    }
  }

//this is the component that displays the text and choices of currently selected question - can add choices but currently does not save. Also will need to be tweaked to display which choice is the correct answer.
  renderQuestionDetail () {
    if (this.state.selectedQuestion) {
      return (
        <QuestionDetail
          title={this.state.selectedLessonTitle}
          question={this.state.selectedQuestion}
        />
      )
    }
  }


  render() {
    if (this.state.loggedIn) {
      return (
        <Row className="App">
          <Navbar display={'lessons'} checkLogin={this.checkLogin}/>
          <div className="container-fluid">
          <LessonTitleList userLessons={this.state.userLessons} selectedLessonTitle={this.state.selectedLessonTitle} handleLessonClick={this.handleLessonClick.bind(this)} handleAddLessonClick={this.handleAddLessonClick.bind(this)}/>
          {this.renderNewLesson()}
          {this.renderQuestionList()}
          {this.renderQuestionDetail()}
          {this.renderNewQuestion()}
          </div>
        </Row>
      );
    } else {
      return (
        <Row className="App">
          <Navbar display={'user'} />
          <Signin checkLogin={this.checkLogin}/>
        </Row>
      )
    }
  }
}

export default App;
