import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap'
import Answer from './QuestionAnswers'

class QuestionDetail extends Component {
  constructor(props) {
    super(props)

    //saves array of the answers inherited through props, in order to be able to add more choices/inputs to it
    this.state = {
      name: this.props.question.name,
      text: this.props.question.text,
      choices: this.props.question.choices,
      answer: this.props.question.answer,
      type: this.props.question.type,
      answerIndex: this.props.question.choices.indexOf(this.props.question.answer)
    }
    this.renderQuestion = this.renderQuestion.bind(this)
    this.addChoice = this.addChoice.bind(this)
    this.getSectionTitle = this.getSectionTitle.bind(this)
    this.setEditBoxHeight = this.setEditBoxHeight.bind(this)
    this.setAnswer = this.setAnswer.bind(this)
    this.saveUpdates = this.saveUpdates.bind(this)
    this.getAnswerCheckStyleColor = this.getAnswerCheckColor.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {

    this.setState({choices: []})
    this.setState({
      name: nextProps.question.name || '',
      text: nextProps.question.text,
      choices: nextProps.question.choices,
      answer: nextProps.question.answer,
      type: nextProps.question.type,
      answerIndex: nextProps.question.choices.indexOf(nextProps.question.answer)
    })

  }

  getSectionTitle() {
    return this.state.type === "question" ? (<h3>Question</h3>) : (<h3>Reading</h3>)
  }

  setEditBoxHeight(style) {
    let styleCopy = {}
    for (var key in style) {
      styleCopy[key] = style[key]
    }
    styleCopy.height = Math.max(80, Math.ceil(this.state.text.length / 40) * 48);
    if (styleCopy.height > 250) styleCopy.height = 250;
    return styleCopy;
  }

  renderQuestion() {
    const { editableTextStyle, nameInputStyle } = styles;
    return (
      <div>
        <div>
          <h3>Name</h3>
          <textArea
            style={ nameInputStyle }
            value={this.state.name}
            placeholder="..."
            onChange={this.handleChange.bind(this, 'name')}/>
        </div>
        <div>
          {this.getSectionTitle()}
          <textArea
            style={ this.setEditBoxHeight(editableTextStyle) }
            value={this.state.text}
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
      newState.choices[index] = event;
    } else {
      event = args[0];
      newState[stateKey] = event.target.value;
    }
    this.setState(newState);
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

  renderAnswers() {
    if (this.state.type === "question") {
      const { fontAwesomeStyle } = styles;
        return (
          <div>
            <h3>Answers</h3>
            {this.state.choices.map((choice, index) =>
              <Answer choice={choice} key={index} index={index} change={this.handleChange} color={this.getAnswerCheckColor(index)} setAnswer={this.setAnswer}/>
            )}
            <i className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle} onClick={this.addChoice}></i>
            <p onClick={this.addChoice} style={{display: "inline"}}> Add another choice</p>
          </div>
        )
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
    let url = `http://localhost:3011/api/content/${this.props.question._id}`
    let data = this.state
    data.choices = data.choices.filter(choice => choice !== '')
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
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
    fontSize:  16,
    position: 'fixed',
    paddingTop: 60,
    width: '100%',
    textWrap: true,
    paddingRight: 30,
    paddingLeft: 30,
    fontFamily: 'Lato',
    zIndex: -1,
    overflow: 'scroll',
  },

  fontAwesomeStyle: {
    color: lightGrey,
    display: 'inline',
    paddingRight: 3,
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
