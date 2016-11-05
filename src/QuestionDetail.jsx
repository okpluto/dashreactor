import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap'

class QuestionDetail extends Component {
  constructor(props) {
    super(props)

    //saves array of the answers inherited through props, in order to be able to add more choices/inputs to it
    this.state = {
      name: this.props.question.name,
      text: this.props.question.text,
      choices: this.props.question.choices,
      answer: this.props.question.answer,
      answerIndex: this.props.question.choices.indexOf(this.props.question.answer)
    }
    this.renderQuestion = this.renderQuestion.bind(this)
    this.renderAnswers = this.renderAnswers.bind(this)
    this.addChoice = this.addChoice.bind(this)
    this.getSectionTitle = this.getSectionTitle.bind(this)
    this.setEditBoxHeight = this.setEditBoxHeight.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
    this.saveUpdates = this.saveUpdates.bind(this)
  }

  getSectionTitle() {
    return this.props.question.type === "question" ? (<h2>Question</h2>) : (<h2>Reading</h2>)
  }

  setEditBoxHeight(style) {
    let styleCopy = {}
    for (var key in style) {
      styleCopy[key] = style[key]
    }
    styleCopy.height = Math.max(80, Math.ceil(this.state.text.length / 40) * 48);
    if (styleCopy.height > 250) styleCopy.height = 250;
    console.log(styleCopy.height)
    return styleCopy;
  }

  renderQuestion() {
    const { QuestionDetailStyle, editableTextStyle, nameInputStyle } = styles;
    return (
      <div>
        <div>
          <h2>Name</h2>
          <input
            style={ nameInputStyle }
            placeholder={(this.props.question.name || "...")}
            onChange={this.handleChange.bind(this, 'name')}/>
        </div>
        <div>
          {this.getSectionTitle()}
          <textArea
            style={ this.setEditBoxHeight(editableTextStyle) }
            defaultValue={this.props.question.text}
            onChange={this.handleChange.bind(this, 'text')}/>
        </div>
      </div>
    )
  }

  handleChange(stateKey, ...args) {
    let event;
    let newState = {};
    if (args.length > 1) {
      let index, event;
      [index, event] = args;
      newState.choices = this.state.choices;
      newState.choices[index] = event.target.value;
    } else {
      event = args[0];
      newState[stateKey] = event.target.value;
    }
    this.setState(newState);
  }

  getAnswerCheckStyle(style, index) {
    let styleCopy = {}
    for (var key in style) {
      styleCopy[key] = style[key]
    }
    if (this.state.answerIndex === index) {
      styleCopy.color = '#2CCC5A';
    }
    return styleCopy
  }

  setAnswer(index) {
    this.setState({
      answer: this.state.choices[index],
      answerIndex: index
    })
  }

  renderAnswers() {
    if (this.props.question.type === "question") {
      const { answerInputStyle, fontAwesomeStyle } = styles;
      if (this.state.choices) {
        return (
          <div>
            <h2>Answers</h2>
              {this.state.choices.map((choiceInput, index) => {
                return (
                  <div>
                    <input
                      style={answerInputStyle}
                      placeholder="..."
                      defaultValue={choiceInput}
                      onChange={this.handleChange.bind(this, 'choices', index)}/>
                      <i className="fa fa-check-circle"
                        aria-hidden="true"
                        style={this.getAnswerCheckStyle(fontAwesomeStyle, index)}
                        onClick={() => this.setAnswer(index)}></i>
                  </div>
                )
              })}
            <i className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle} onClick={this.addChoice}></i>
            <p onClick={this.addChoice} style={{display: "inline"}}> Add another choice</p>
          </div>
        )
      }
    } else {
      return;
    }
  }

  //adds another text input for answer choices, up to 5 total
  addChoice() {
    if (this.state.choices.length < 5) {
      let choices = this.state.choices;
      choices.push("");
      this.setState({choices: choices});
    }
  }

  saveUpdates() {

  }

  render() {
    const { QuestionDetailStyle, saveButtonStyle } = styles;
    return (
      <Col sm={5} smOffset={7} style={QuestionDetailStyle}>

        {this.renderQuestion()}
        {this.renderAnswers()}
        <Button style={saveButtonStyle} onClick={this.saveUpdates}>Save</Button>
      </Col>
    )
  }
}
const coral = '#FA848A'
const lightGrey = '#A3A8AB'

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

  fontAwesomeStyle: {
    color: lightGrey,
    display: 'inline',
    paddingRight: 3,
  },

  answerInputStyle: {
    border: 'none',
    display: 'inline',
    color: '#7A7886'
  },

  editableTextStyle: {
    width: 300,
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
    display: 'inline-block'
  },

  nameInputStyle: {
    color: '#7A7886',
    borderWidth: 0,
    opacity: 1,
    textAlign: 'justified',
    display: 'inline-block'
  },

  saveButtonStyle: {
    color: 'white',
    backgroundColor: coral,
    marginTop: 50,
    marginLeft: 200
  }
}

export default QuestionDetail;

//<i style={{color: lightGrey}}>Click elements to edit</i>