import React, { Component } from 'react';
import { Button, Col, FormControl } from 'react-bootstrap';
import Answer from './QuestionAnswers';
import { saveQuestion } from '../services/QuestionServices.js';

const coral = '#FA848A'
const lightGrey = '#A3A8AB'

const styles = {
  QuestionDetailStyle: {
    height: '100%',
    fontSize: 16,
    position: 'fixed',
    paddingTop: 60,
    width: '100%',
    textWrap: true,
    paddingRight: 30,
    paddingLeft: 30,
    fontFamily: 'Lato',
    zIndex: -1,
    overflow:'scroll'
  },

  fontAwesomeStyle: {
    color: lightGrey,
    display: 'inline',
    paddingRight: 3,
  },

  answerInputStyle: {
    border: 'none',
    color: '#7A7886'
  },

  editableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
    width: '35%'
  },

  shortEditableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
    width: 50
  },

  addNewChoiceSpanStyle: {
    display:'block',
    color: lightGrey,
    cursor: 'pointer'
  },

  saveButtonStyle: {
    color: 'white',
    backgroundColor: coral,
    marginTop: 50,
    marginLeft: 200
  }
}

class newQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lessonId: this.props.selectedLessonId,
      name: "",
      order: this.props.selectedLessonQuestions.length,
      type: 'question',
      text: '',
      choices: [''],
      answer: '',
      answerIndex: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.getAnswerCheckStyleColor = this.getAnswerCheckColor.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleSaveNewQuestionClick = this.props.handleSaveNewQuestionClick.bind(this);
  }

  handleChange(stateKey, ...args) {
    let event;
    let newState = {};
    if (args.length > 1) {
      let index, event;
      [index, event] = args;
      newState.choices = this.state.choices;
      newState.choices[index] = event;
    } else {
      event = args[0];
      newState[stateKey] = event.target.value;
    }
    this.setState(newState);
  }

  //adds another text input for answer choices, up to 5 total
  addChoice() {
    if (this.state.choices.length < 5) {
      let choices = this.state.choices;
      choices.push("");
      this.setState({choices: choices});
    }
  }

  renderQuestionName() {
    const { editableTextStyle } = styles;
    return (
      <div>
        <h3>Name</h3>
        <input
          style={editableTextStyle}
          value={this.state.name}
          placeholder="Ex. 'Recursion Summary'"
          onChange={this.handleChange.bind(this, 'name')} />
      </div>
    )
  }

  renderOrder() {
    const { shortEditableTextStyle } = styles;
    return (
      <div>
        <h3>Order</h3>
        <input
          style={shortEditableTextStyle}
          defaultValue={this.state.order}
          onChange={this.handleChange.bind(this, 'order')} />
      </div>
    )
  }

  renderType() {
    const { editableTextStyle } = styles;
    return (
      <div>
        <h3>Type</h3>
        <FormControl componentClass="select" style={editableTextStyle, {width: 100}} onChange={this.handleChange.bind(this, 'type')}>
          <option value="question" selected>Question</option>
          <option value="reading">Reading</option>
        </FormControl>
      </div>
    )
  }

  renderReading() {
    const { editableTextStyle } = styles;
    return (
      <div>
        <h3>Reading</h3>
        <textarea
          style={ editableTextStyle }
          placeholder="Write your lesson here..."
          value={this.state.text}
          onChange={this.handleChange.bind(this, 'text')} />
      </div>
    )
  }

  getAnswerCheckColor(index) {
    if (this.state.answerIndex === index) {
      // green
      return '#2CCC5A';
    }
    // light grey
    return '#A3A8AB'
  }

  setAnswer(index) {
    this.setState({
      answer: this.state.choices[index],
      answerIndex: index
    })
  }

  renderQuestion() {
    const { editableTextStyle, answerInputStyle, fontAwesomeStyle, addNewChoiceSpanStyle } = styles;
    return (
      <div>
        <h3>Question</h3>
        <textarea
          style={ editableTextStyle }
          placeholder="Write your question here..."
          value={this.state.text}
          onChange={this.handleChange.bind(this, 'text')} />
        <h3>Answers</h3>
        {this.state.choices.map((choice, index) =>
          <Answer choice={choice} key={index} index={index} change={this.handleChange} color={this.getAnswerCheckColor(index)} setAnswer={this.setAnswer}/>
        )}
        <br />
        <span style={addNewChoiceSpanStyle} onClick={this.addChoice.bind(this)}>
          <i className="fa fa-plus-circle"
            aria-hidden="true"
            style={fontAwesomeStyle}
            >
          </i>
          <p style={{display: "inline"}}>
            Add another choice
          </p>
        </span>
      </div>
    )
  }

  renderRightType() {
    if (this.state.type === 'question') {
      return this.renderQuestion();
    } else {
      return this.renderReading();
    }
  }

  handleSave() {
    console.log("About to save: ", this.state);
    saveQuestion(this.state)
    .then(data => {
      this.handleSaveNewQuestionClick(this.state);
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    const { QuestionDetailStyle, saveButtonStyle } = styles;
    return (
      <Col sm={5} smOffset={7} style={QuestionDetailStyle}>
        {this.renderQuestionName()}
        {this.renderOrder()}
        {this.renderType()}
        {this.renderRightType()}
        <Button style={saveButtonStyle} onClick={this.handleSave}>Save</Button>
      </Col>
    )
  }
}

export default newQuestion;