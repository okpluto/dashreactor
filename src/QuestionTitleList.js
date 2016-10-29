import React, { Component } from 'react';
// import LessonDummyData from './LessonDummyData';
import QuestionTitle from './QuestionTitle';
import { Col } from 'react-bootstrap';

class QuestionTitleList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   lessons: LessonDummyData
    // }
  }

  render () {

    const { questionListStyle } = styles;

    return (
      <Col sm={3} smOffset={4} xs={3} xsOffset={5} style={questionListStyle} >
        {
          this.props.lessonContent.map(question => {

            return (
              <QuestionTitle
                title={question.text}
                questionContent={question}
                handleQuestionClick={this.props.handleQuestionClick.bind(this)}
              />
            )
          })
        }
      </Col>
    )
  }
}

const coral = '#FA848A'

const styles = {
  questionListStyle: {
    height: '100%',
    position: 'fixed',
    paddingRight: 0,
    paddingLeft:0,
    paddingTop: 100,
    marginTop: 0,
    fontFamily: 'Lato',
    zIndex: -1,
    fontSize: 18,
  }
}

export default QuestionTitleList