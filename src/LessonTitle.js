import React, { Component } from 'react';
// import LessonDummyData from './LessonDummyData';
import QuestionTitleList from './QuestionTitleList';


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
      }
    );
    this.props.handleLessonClick.call(this, this.props)
  }

  renderTitles() {
    const { defaultStyle, selectedStyle } = styles;
    let titleStyle = this.state.clicked ? {...defaultStyle, ...selectedStyle} : defaultStyle
    return (
      <div style={titleStyle} onClick={this.handleClick.bind(this)}>
        <p>{this.props.title}</p>
      </div>
    );
  }

  render () {
    return (
      <div>
        {this.renderTitles()}
      </div>
    )
  }
}

const coral = '#FA848A'

const styles = {
  defaultStyle: {
    backgroundColor: 'white',
    display: 'block',
    height: 60,
    width: '100%',
    paddingLeft: 10,
    fontFamily: 'Lato',
    paddingBottom: 15,
  },
  selectedStyle: {
    backgroundColor: coral,
    color: 'white'
  }

}

export default LessonTitle