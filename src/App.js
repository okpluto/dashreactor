import React, { Component } from 'react';
import Navbar from './Navbar';
import LessonTitleList from './LessonTitleList';
import QuestionTitleList from './QuestionTitleList';
import QuestionDetail from './QuestionDetail';
import { Button, Col, Row } from 'react-bootstrap';


class App extends Component {
  constructor() {
    super();

    this.state = {
      selectedLesson: null,
      selectedLessonQuestions: null,
      selectedLessonTitle: null,
      selectedQuestion: null
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
    this.setState({
      selectedQuestion: question
    });
  }

  renderQuestionList () {
    if (this.state.selectedLesson !== null) {

      return (
        <QuestionTitleList
          title={this.state.selectedLessonTitle}
          lessonContent={this.state.selectedLessonQuestions}
          handleQuestionClick={this.handleQuestionClick.bind(this)}
        />
      )
    }
  }

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
        <LessonTitleList handleLessonClick={this.handleLessonClick.bind(this)}/>
        {this.renderQuestionList()}
        {this.renderQuestionDetail()}
        </div>
      </Row>
    );
  }
}

export default App;
