import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap';

class QuestionDetail extends Component {
  constructor(props) {
    super(props)
    //sets the state to an array of the questions answers
    this.state = {
      inputs: this.props.question.choices
    }
  }

  renderQuestion() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h2>Question</h2>
        <textArea style = { editableTextStyle } defaultValue={this.props.question.text} />
      </div>
    )
  }


  renderAnswers() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    if (this.props.question.choices) {
      {console.log(this.state.inputs)}
      return (
        <div>
        <h2>Answers</h2>
        <ul>
          {this.state.inputs.map(choiceInput => {
            return <li style={{listStyleType: 'none', marginLeft: -40}}><input style={styles.answerInputStyle} defaultValue={choiceInput}/></li>;
          })}
        </ul>
        <Button onClick={this.addChoice.bind(this)}>Add another choice</Button>
        </div>
      )
    }
  }

  //adds another text input for choices, up to 5
  addChoice() {
    if (this.state.inputs.length < 5) {
      let choices = this.state.inputs;
      choices.push("");
      this.setState({inputs: choices});
    }
  }

  render() {
    const { QuestionDetailStyle, editableTextStyle } = styles;
    return (
      <Col sm={5} smOffset={7} style={QuestionDetailStyle}>
        {this.renderQuestion()}
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
    width: '100%',
    height: 40,
    textWrap: true,
    paddingRight: 0,
    paddingLeft:40,
    fontFamily: 'Lato',
    zIndex: -1,
  },

  answerInputStyle: {
    border: 'none'
  },

  editableTextStyle: {
    padding: 10,
    color: 'black',
    opacity: 1,
    border: 'none',
    textAlign: 'justified',
    outline: 'none'
  }
}

export default QuestionDetail;

