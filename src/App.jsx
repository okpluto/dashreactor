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
import { getLessons, getLessonById, addLesson, updateLesson} from '../services/LessonServices.js';
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
      //determines whether 'NewQuestion' is visible.
      creatingQuestion: false,
      creatingLesson: false,
      //pulled from DB on authentication
      loggedIn: false,
      userLessons: [],
      //TESTING, REMOVE FOLLOWING LINE LATER
      lessons: []
    }
    this.checkLogin = this.checkLogin.bind(this)
    //TESTING, REMOVE COMMENT LATER
    //this.checkLogin()
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
  // TESTING, REMOVE LATER
  componentDidMount() {
    var self = this;
    getLessons()
    .then(lessons => {
      lessons.map(lesson => {
        getLessonById(lesson._id)
        .then(data => {
          let lessons = self.state.lessons;
          lessons.push(data);
          self.setState({lessons: lessons});
        });
      });
    });
  }

  handleLessonClick (lesson) {
    if (this.state.selectedLesson && this.state.selectedLesson.title === lesson.title) {
      this.setState({
        selectedLesson: null,
        selectedLessonTitle: null,
        creatingLesson:false,
        selectedQuestion: null,
        selectedLessonQuestions: null,
        lessonToEdit: null
      })
    } else {
      this.setState({
        selectedLesson: lesson,
        selectedLessonQuestions: lesson.lessonContent,
        selectedLessonTitle: lesson.title,
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
      return <NewLesson handleSaveNewLessonClick={this.handleSaveNewLessonClick.bind(this)}/>
    }
  }

  //TESTING, CHANGE LESSONS TO USERLESSONS LATER
  handleSaveNewLessonClick (lesson) {
    var self = this;
    addLesson(lesson)
    .then(id => {
      getLessonById(id)
      .then(data => {
        let newLessons = self.state.lessons;
        newLessons.push(data);
        self.setState({
          lessons: newLessons,
          creatingLesson: false
        });
      })
    });
  }

  handleEditLessonClick (lesson) {
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
      debugger;
      let id = updatedLesson._id;
      let newLessons = self.state.lessons;
      for (var i = 0; i < newLessons.length; i++) {
        if (newLessons[i].lessonInfo._id === id) {
          newLessons[i].lessonInfo = updatedLesson;
          break;
        }
      }
      self.setState({
        lessons: newLessons,
        lessonToEdit: null
      });
      window.alert('We have updated the lesson')
    })
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
          <LessonTitleList
            userLessons={this.state.lessons}
            selectedLessonTitle={this.state.selectedLessonTitle}
            handleLessonClick={this.handleLessonClick.bind(this)}
            handleAddLessonClick={this.handleAddLessonClick.bind(this)}
            handleEditLessonClick={this.handleEditLessonClick.bind(this)}/>
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
