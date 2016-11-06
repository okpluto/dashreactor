import React, { Component } from 'react';
import QuestionTitleList from './QuestionTitleList';


class LessonTitle extends Component {
  constructor(props) {
    super(props);
  }
  renderPublishIcon(){
    const { publishedIconStyle, publishIconStyle } = styles;
    if (this.props.lessonInfo.published) {
      return (
        <i style={publishedIconStyle} title="this lesson is already published" className="fa fa-upload" aria-hidden="true"></i>
      )
    } else {
      return (
        <i style={publishIconStyle} className="fa fa-upload" aria-hidden="true" onClick={this.props.handlePublishLessonClick.bind(this, this.props)}></i>
      )
    }
  }
  renderTitles() {

    /*sets the style to be either selected+default or default style alone, depending on the selectedLesson prop in app.js's state.*/

    const { defaultStyle, selectedStyle, iconStyle, titleStyle} = styles;

    let lineStyle = this.props.isSelectedLesson ? {...defaultStyle, ...selectedStyle} : defaultStyle

    return (
      <div style={lineStyle} >
        <p style={titleStyle} onClick={this.props.handleLessonClick.bind(this, this.props)}>{this.props.title}</p>
        {this.renderPublishIcon()}
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
    marginRight: 10,
    color: '#7A7886',
  },
  publishIconStyle:{
    float: 'right',
    marginRight: 10,
    color: '#2CCC5A',
  },
  publishedIconStyle:{
    float: 'right',
    marginRight: 10,
    color: '#7A7886',
    cursor:'not-allowed'
  }
}

export default LessonTitle