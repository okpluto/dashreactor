import React, { Component } from 'react';
import LessonDummyData from './LessonDummyData';
import QuestionTitleList from './QuestionTitleList';


class QuestionTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  render () {
    const { titleStyle, selectedStyle } = styles;
    return (
      // <div style = {this.state.clicked ? {selectedStyle} : {titleStyle}} onClick={this.handleClick}>
      <div style = {titleStyle}>
      {console.log(this.props.questionContent)}
        <p>{this.props.title}</p>
      </div>
    )
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'
const coral = '#FA848A'



const styles = {
  titleStyle: {
    backgroundColor: 'lightGrey',
    width: '100%',
    height: 20,
    paddingLeft: 10,
    marginBottom: 20,
    fontFamily: 'Lato',
  },
  selectedStyle: {
    color: 'white',
    backgroundColor: 'coral',
    opacity: 1,
  }
}

export default QuestionTitle