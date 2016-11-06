import React, { Component } from 'react';
import QuestionTitleList from './QuestionTitleList';


class LessonTitle extends Component {
  constructor(props) {
    super(props);
  }

  renderTitles() {

    /*sets the style to be either selected+default or default style alone, depending on the selectedLesson prop in app.js's state.*/

    const { defaultStyle, selectedStyle, iconStyle, titleStyle } = styles;

    let lineStyle = this.props.isSelectedLesson ? {...defaultStyle, ...selectedStyle} : defaultStyle

    return (
      <div style={lineStyle} >
        <p style={titleStyle} onClick={this.props.handleLessonClick.bind(this, this.props)}>{this.props.title}</p>
        <i style={iconStyle} className="fa fa-pencil" aria-hidden="true" onClick={this.props.handleEditLessonClick.bind(this, this.props)}></i>
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
    height: 60,
    width: '100%',
    paddingLeft: 10,
    fontFamily: 'Lato',
    cursor: 'pointer',
  },
  selectedStyle: {
    backgroundColor: coral,
    color: 'white',
  },
  titleStyle:{
    float: 'left',
    width: '50%'
  },
  iconStyle: {
    float: 'right',
    marginRight: 10
  }

}

export default LessonTitle