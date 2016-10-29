import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderAnswers() {
    if (this.props.question.choices.length > 0) {
      return (
        <div>
        <h2>Answers</h2>
        <ul>
          {this.props.question.choices.map(choice => {
            return (<li>{choice}</li>)
          })}
        </ul>

        <Button>Save</Button>
        </div>
      )
    }
  }

  render() {
    const { QuestionDetailStyle } = styles;
    return (
      <Col sm={4} smOffset={7} style={QuestionDetailStyle}>
        <h2>Question</h2>
        <p>{this.props.question.text}</p>
        {this.renderAnswers()}
      </Col>
    )
  }
}

const styles = {
  QuestionDetailStyle: {
    height: '100%',
    fontSize: 20,
    position: 'fixed',
    paddingTop: 90,
    paddingRight: 0,
    paddingLeft:40,
    fontFamily: 'Lato',
    zIndex: -1,
  },
}

export default QuestionDetail;

