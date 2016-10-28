import React, { Component } from 'react';
import Navbar from './Navbar';
import LessonTitleList from './LessonTitleList';
import QuestionTitleList from './QuestionTitleList';
import { Button, Col, Row } from 'react-bootstrap';


class App extends Component {
  render() {
    return (
      <Row className="App">
        <Navbar />
        <LessonTitleList />
      </Row>
    );
  }
}

export default App;
