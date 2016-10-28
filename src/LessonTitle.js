import React, { Component } from 'react';
import LessonDummyData from './LessonDummyData';
import QuestionTitleList from './QuestionTitleList';
import { Col } from 'react-bootstrap';



class LessonTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      selectedLesson: {}
    }
  }

  handleClick() {
    this.setState(
      {
        clicked: !this.state.clicked,
        selectedLesson: this.props.title
      }
    );
  }

  renderQuestionList() {
    const { titleStyle, selectedStyle } = styles;

    if (this.state.clicked) {
      console.log(this.state.selectedLesson, this.props.title)
      return (
        <QuestionTitleList
          title={this.props.title}
          lessonContent={this.props.lessonContent}
          style={this.state.selectedLesson === this.props.title ? selectedStyle : titleStyle } />
      )
    }
  }

  renderTitles() {
    const { titleStyle} = styles;
    return (
      <div style = {titleStyle} onClick={this.handleClick.bind(this)}>
        <p>{this.props.title}</p>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.renderTitles()}
        {this.renderQuestionList()}
      </div>
    )
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'
const coral = '#FA848A'

const styles = {
  titleStyle: {
    // backgroundColor: 'white',
    display: 'block',
    height: 60,
    width: '100%',
    paddingLeft: 10,
    margin: 0,
    fontFamily: 'Lato',
    paddingBottom: 15,
  }
}

export default LessonTitle