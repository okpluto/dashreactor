import React, { Component } from 'react';
import LessonDummyData from './LessonDummyData';
import LessonTitle from './LessonTitle';
import QuestionTitle from './QuestionTitle';
import { Col } from 'react-bootstrap';

class QuestionTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: LessonDummyData
    }
  }

  render () {
    const { questionListStyle } = styles;

    return (
      <Col sm={3} smOffset={3}style={questionListStyle} >
        {
          this.props.lessonContent.map(question => {
          return <QuestionTitle title={question.text} questionContent={question}/>
          })
        }
      </Col>
    )
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'
const coral = '#FA848A'

const styles = {
  questionListStyle: {
    height: '100%',
    backgroundColor: 'lightGrey',
    position: 'fixed',
    paddingLeft: 10,
    marginTop: 0,
    fontFamily: 'Lato',
    zIndex: -1,
  },
  selectedStyle: {
    color: 'white',
    backgroundColor: coral,
    opacity: 1,
  }
}

export default QuestionTitleList