import React, { Component } from 'react';
import { Button, Col, FormControl } from 'react-bootstrap';

class newLesson extends Component {
  constructor (props) {
    super(props)
    this.state = {
<<<<<<< 8c6982c11faf8b936b0196ff6290df3856a3ddab
      lesson: {
        tite: '',
        description: '',
        difficultyRating: '',
        category: ''
      }
    };
  }

  handleChange(props, event) {
    debugger;
    let change = this.state.lesson;
    if (props === 'difficultyRating' || props === 'category') {
      change[props] = event.target
    } else {
      change[props] = event.target.value;
    }
    this.setState(change);
    console.log(this.state.lesson);
=======
    }
>>>>>>> Add lesson
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
<<<<<<< 8c6982c11faf8b936b0196ff6290df3856a3ddab
        <FormControl componentClass="select" onChange={this.handleChange.bind(this, 'difficultyRating')}>
          <option value="1" selected>1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
=======
        <FormControl componentClass="select">
          <option value="easy" selected>Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
>>>>>>> Add lesson
        </FormControl>
      </div>
    )
  }

  renderCatogory(){
    const { TitleDetailStyle } = styles;
    return (
      <div>
        <h3>Category</h3>
<<<<<<< 8c6982c11faf8b936b0196ff6290df3856a3ddab
        <FormControl componentClass="select" onChange={this.handleChange.bind(this, 'category')}>
          <option value="functions" selected>Functions</option>
          <option value="objects">Objects</option>
          <option value="arrays">Arrays</option>
          <option value="es6">es6</option>
          <option value="loop">Loop</option>
          <option value="variables">Working with variables</option>
          <option value="syntax">Syntax</option>
=======
        <FormControl componentClass="select" >
          <option value="?" selected>?</option>
          <option value="?">?</option>
          <option value="?">?</option>
>>>>>>> Add lesson
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
<<<<<<< 8c6982c11faf8b936b0196ff6290df3856a3ddab
        <Button style={saveButtonStyle} onClick={this.props.handleSaveNewLessonClick.bind(this, this.state.lesson)}>Save</Button>
=======
        <Button style={saveButtonStyle} onClick={this.props.handleSaveNewLessonClick.bind(this)}>Save</Button>
>>>>>>> Add lesson

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