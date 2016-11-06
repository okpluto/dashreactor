import React, { Component } from 'react';
import Navbar from './Navbar';
import LessonTitleList from './LessonTitleList';
import QuestionTitleList from './QuestionTitleList';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import NewLesson from './NewLesson';
import EditLesson from './EditLesson';
import Signin from './Signin'
import { Row } from 'react-bootstrap';
import { getLessons, getLessonById, addLesson, updateLesson, publishLesson } from '../services/LessonServices.js';
import { getUser } from '../services/userServices.js'


class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedLesson: null,
      selectedLessonQuestions: null,
      selectedLessonTitle: null,
      selectedQuestion: null,
      lessonToEdit: null,
      //determines whether 'NewQuestion & NewLesson' is visible.
      creatingQuestion: false,
      creatingLesson: false,
      //pulled from DB on authentication
      loggedIn: false,
      userLessons: [],
    }
    this.checkLogin = this.checkLogin.bind(this)
    this.checkLogin();
  }

  checkLogin() {
    this.setState({
      userLessons: []
    });
    let self = this;
    if (localStorage.getItem('userAuth')) {
      const auth = JSON.parse(localStorage.getItem('userAuth'));
      getLessons(auth.jwt)
      .then(lessons => {
        console.log('ALL LESSONS:', lessons);
        lessons.map(lesson => {
          getLessonById(lesson._id)
          .then(data => {
            let userLessons = self.state.userLessons;
            let userId = JSON.parse(localStorage.getItem('userAuth')).id
            if (data.lessonInfo.creator === userId) {
              userLessons.push(data);
              this.setState({userLessons: userLessons});
            }
          });
        });
        console.log('USER LESSONS:', this.state.userLessons)
        self.setState({loggedIn: true})

      })
    } else {
      if (self.state.loggedIn) {
        self.setState({loggedIn: false})
      }
    }
  }

// ********* Lesson ********* //

  handleLessonClick (lesson) {
    if (this.state.selectedLesson && this.state.selectedLesson.title === lesson.title) {
      this.setState({
        selectedLesson: null,
        selectedLessonTitle: null,
        selectedLessonId: null,
        creatingLesson:false,
        creatingQuestion: false,
        selectedQuestion: null,
        selectedLessonQuestions: null,
        selectedLessonTitle:null,
        lessonToEdit: null
      })
    } else {
      this.setState({
        selectedLesson: lesson,
        selectedLessonQuestions: lesson.lessonContent,
        selectedLessonTitle: lesson.title,
        selectedLessonId: lesson.lessonId,
        selectedQuestion: null,
        creatingLesson: false,
        lessonToEdit: null
      });
    }
  }

  handleAddLessonClick (lesson) {
    this.setState({
      creatingLesson: true,
      selectedLesson: null,
      selectedLessonTitle: null,
      lessonToEdit: null
    });
  }

  handleSaveNewLessonClick (lesson) {
    var self = this;
    addLesson(lesson)
    .then(id => {
      getLessonById(id)
      .then(data => {
        let newLessons = self.state.userLessons;
        newLessons.push(data);
        self.setState({
          userLessons: newLessons,
          creatingLesson: false
        });
      })
    });
  }

  handleEditLessonClick (lesson) {
    console.log(lesson)
    if (this.state.lessonToEdit && this.state.lessonToEdit.title === lesson.title) {
      this.setState({
        selectedLesson: null,
        selectedLessonQuestions: null,
        selectedLessonTitle: null,
        selectedQuestion: null,
        lessonToEdit: null,
        creatingQuestion: false,
        creatingLesson: false
      })
    } else {
      this.setState({
        selectedLesson: null,
        selectedLessonQuestions: null,
        selectedLessonTitle: null,
        selectedQuestion: null,
        lessonToEdit: lesson,
        creatingQuestion: false,
        creatingLesson: false
      });
    }
  }

  handleUpdateLessonClick (lesson){
    var self = this;
    updateLesson(lesson)
    .then(updatedLesson => {
      let id = updatedLesson._id;
      let newLessons = self.state.userLessons;
      for (var i = 0; i < newLessons.length; i++) {
        if (newLessons[i].lessonInfo._id === id) {
          newLessons[i].lessonInfo = updatedLesson;
          break;
        }
      }
      self.setState({
        userLessons: newLessons
      });
      window.alert('We have updated the lesson')
    })
  }

  handlePublishLessonClick(lesson) {

    var self = this;
    publishLesson(lesson)
    .then(updatedLesson => {
      console.log('RESPONSE', updatedLesson);
      let id = updatedLesson._id;
      let newLessons = self.state.userLessons;
      for (var i = 0; i < newLessons.length; i++) {
        if (newLessons[i].lessonInfo._id === id) {
          newLessons[i].lessonInfo = updatedLesson;
          break;
        }
      }
      self.setState({
        userLessons: newLessons,
        lessonToEdit: null
      });
      window.alert('We have published the lesson')
    })
    .catch(() => {
      window.alert('You need to have at least 5 questions to publish a lesson');
      lesson.lessonInfo.published = false;
    })
  }

  renderNewLesson(){
    if (this.state.creatingLesson) {
      return <NewLesson handleSaveNewLessonClick={this.handleSaveNewLessonClick.bind(this)}/>
    }
  }
  renderEditLesson() {
    if (this.state.lessonToEdit) {
      return (
        <EditLesson
          lessonToEdit={this.state.lessonToEdit}
          handleUpdateLessonClick={this.handleUpdateLessonClick.bind(this)}
        />
      )
    }
  }
// ********* End of Lesson ********* //

// ********* Question ********* //

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

  renderNewQuestion() {
    if (this.state.creatingQuestion) {
      return <NewQuestion
        handleSaveNewQuestionClick={this.handleSaveNewQuestionClick.bind(this)}
        selectedLessonId={this.state.selectedLessonId}
        selectedLessonQuestions={this.state.selectedLessonQuestions} />
    }
  }

// ********* End of Question ********* //

  render() {
    if (this.state.loggedIn) {
      return (
        <Row className="App">
          <Navbar display={'lessons'} checkLogin={this.checkLogin}/>
          <div className="container-fluid">

          <LessonTitleList
            userLessons={this.state.userLessons}
            selectedLessonTitle={this.state.selectedLessonTitle}
            handleLessonClick={this.handleLessonClick.bind(this)}
            handleAddLessonClick={this.handleAddLessonClick.bind(this)}
            handleEditLessonClick={this.handleEditLessonClick.bind(this)}
            handlePublishLessonClick={this.handlePublishLessonClick.bind(this)}
          />
          {this.renderNewLesson()}
          {this.renderQuestionList()}
          {this.renderQuestionDetail()}
          {this.renderNewQuestion()}
          {this.renderEditLesson()}
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
