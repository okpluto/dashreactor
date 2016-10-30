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
      // this.setState({
      //   selectedQuestion: question
      // })
    }
  }

  handleAddQuestionClick (lesson) {
    this.setState({creatingQuestion: true});
  }

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
          handleQuestionClick={this.handleQuestionClick.bind(this)}
          handleAddQuestionClick={this.handleAddQuestionClick.bind(this)}
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
    } else {
      return (
        <div></div>
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
        {this.renderNewQuestion()}
        </div>
      </Row>
    );
  }
}

export default App;
