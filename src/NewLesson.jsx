import React, { Component } from 'react';
import { Button, Col, FormControl } from 'react-bootstrap';

class newLesson extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  renderTitle() {
    const { TitleDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h3>Title</h3>
        <input style={editableTextStyle} placeholder="title" />
      </div>
    )
  }

  renderDescription() {
    const { TitleDetailStyle, editableTextStyle } = styles;
    return (
      <div>
        <h3>Description</h3>
        <input style={editableTextStyle} placeholder="description" />
      </div>
    )
  }

  renderDifficultyRating(){
    const { TitleDetailStyle } = styles;
    return (
      <div>
        <h3>Difficulty Rating</h3>
        <FormControl componentClass="select">
          <option value="easy" selected>Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </FormControl>
      </div>
    )
  }

  renderCatogory(){
    const { TitleDetailStyle } = styles;
    return (
      <div>
        <h3>Category</h3>
        <FormControl componentClass="select" >
          <option value="?" selected>?</option>
          <option value="?">?</option>
          <option value="?">?</option>
        </FormControl>
      </div>
    )
  }

  render() {
    const { lessonListStyle, saveButtonStyle } = styles;
    return (
      <Col sm={3}  smOffset={4} xs={3} xsOffset={5} style={lessonListStyle}>
        {this.renderTitle()}
        {this.renderDescription()}
        {this.renderDifficultyRating()}
        {this.renderCatogory()}
        <Button style={saveButtonStyle} onClick={this.props.handleSaveNewLessonClick.bind(this)}>Save</Button>

      </Col>
    )
  }
}

const coral = '#FA848A'
const lightGrey = '#A3A8AB'

const styles = {
  lessonListStyle: {
    height: '100%',
    position: 'fixed',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 60,
    marginTop: 0,
    fontFamily: 'Lato',
    zIndex: -1,
    fontSize: 16,
    boxShadow: '2px 0px 5px -1px rgba(0,0,0,0.2)',
    overflow:'scroll'
  },

  TitleDetailStyle: {
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
    color: '#7A7886'
  },

  editableTextStyle: {
    padding: 10,
    color: '#7A7886',
    opacity: 1,
    border: 0.2,
    textAlign: 'justified',
  },

  saveButtonStyle: {
    color: 'white',
    backgroundColor: coral,
    marginTop: 50,
    marginLeft: 200
  }
}

export default newLesson;