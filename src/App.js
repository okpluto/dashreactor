import React, { Component } from 'react';
import Navbar from './Navbar';
import LessonTitleList from './LessonTitleList';
import QuestionTitleList from './QuestionTitleList';
import QuestionDetail from './QuestionDetail';
import NewQuestion from './NewQuestion';
import { Button, Col, Row } from 'react-bootstrap';


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
    }
  }


  handleLessonClick (lesson) {
    this.setState({
      selectedLesson: lesson,
      selectedLessonQuestions: lesson.lessonContent,
      selectedLessonTitle: lesson.title
    });
  }


  handleQuestionClick (question) {
    if (!this.state.selectedQuestion) {
      this.setState({
        selectedQuestion: question
      });
    } else {
      this.setState({
        selectedQuestion: null
      })
    }
  }

//enables appearance of question-creation form (NewQuestion.js)
  handleAddQuestionClick (lesson) {
    this.setState({creatingQuestion: true});
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
    return (
      <Row className="App">
        <Navbar />
        <div className="container-fluid">
        <LessonTitleList selectedLessonTitle={this.state.selectedLessonTitle} handleLessonClick={this.handleLessonClick.bind(this)}/>
        {this.renderQuestionList()}
        {this.renderQuestionDetail()}
        {this.renderNewQuestion()}
        </div>
      </Row>
    );
  }
}

export default App;
