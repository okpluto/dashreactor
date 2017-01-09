import React, { Component } from 'react';
// import LessonDummyData from './LessonDummyData';
import QuestionTitle from './QuestionTitle';
import { Col } from 'react-bootstrap';

class QuestionTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonContent: this.props.lessonContent
    }
  }

  componentWillUpdate(nextProps) {

    if (nextProps.lessonContent !== this.props.lessonContent){
      console.log('Triggered', nextProps)
      this.setState({
        lessonContent: nextProps.lessonContent
      })
    }
  }

  render () {

    const { questionListStyle, fontAwesomeStyle } = styles;

    return (
      <Col sm={3} smOffset={4} xs={3} xsOffset={5} style={questionListStyle} >
       <span style={fontAwesomeStyle} onClick={this.props.handleAddQuestionClick}><i className="fa fa-plus-circle" aria-hidden="true" style={{fontSize: 40}}></i>Add a question</span>
        {
          this.state.lessonContent
          .sort(function(currContent, nextContent) {
            return currContent.order - nextContent.order;
          })
          .map(question => {
            let isSelectedQuestion;

            if (this.props.selectedQuestion) {
              isSelectedQuestion = this.props.selectedQuestion === question
            }



            return (
              <QuestionTitle
                title={question.name}
                questionContent={question}
                isSelectedQuestion={isSelectedQuestion}
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
const lightGrey = '#A3A8AB'


const styles = {
  questionListStyle: {
    height: '100%',
    position: 'fixed',
    paddingRight: 0,
    paddingLeft: 0,
    paddingLeft: 0,
    paddingTop: 60,
    marginTop: 0,
    fontFamily: 'Lato',
    zIndex: -1,
    fontSize: 18,
    boxShadow: '2px 0px 5px -1px rgba(0,0,0,0.2)',
    overflow:'scroll'
  },

  fontAwesomeStyle: {
    color: '#DADCDD',
    display: 'inline',
    marginLeft: 10,
    fontSize: 20,
    cursor:'pointer'
  },
}

export default QuestionTitleList