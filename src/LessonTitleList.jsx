import React, { Component } from 'react';
import LessonTitle from './LessonTitle';
import { Col } from 'react-bootstrap';
import LessonDummyData from './LessonDummyData';
import { getLessons, getLessonById } from '../services/LessonServices.js';

class LessonTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: [],
      show: false
    }
  }

  componentDidMount() {
    var self = this;
    getLessons()
    .then(lessons => {
      lessons.map(lesson => {
        getLessonById(lesson._id)
        .then(data => {
          let lessons = this.state.lessons;
          lessons.push(data);
          this.setState({lessons: lessons});
        });
      });
    });
  }

  render () {
    const { LessonTitleListStyle, fontAwesomeStyle } = styles;

    return (
      <Col sm={3} style={LessonTitleListStyle}>
       <i onClick={this.props.handleAddLessonClick} className="fa fa-plus-circle" aria-hidden="true" style={fontAwesomeStyle} ></i>
        {
          this.state.lessons.map(lesson => {
            let isSelectedLesson = lesson.lessonInfo.title === this.props.selectedLessonTitle
            return (
              <LessonTitle
                isSelectedLesson={isSelectedLesson}
                handleLessonClick={this.props.handleLessonClick.bind(this)}
                title={lesson.lessonInfo.title}
                lessonContent={lesson.lessonContent}
              />
            )
          })
        }
      </Col>
    )
  }
}

const styles = {
  LessonTitleListStyle: {
    height: '100%',
    fontSize: 20,
    backgroundColor: 'white',
    position: 'fixed',
    paddingTop: 60,
    paddingRight: 0,
    paddingLeft:0,
    marginLeft: 100,
    fontFamily: 'Lato',
    zIndex: 0,
    boxShadow: '0px 0px 5px -1px rgba(0,0,0,0.2)',
    overflow:'scroll'
  },
  fontAwesomeStyle: {
    color: '#DADCDD',
    display: 'inline',
    marginLeft: 10,
    fontSize: 40,
    cursor: 'pointer'
  },
}

export default LessonTitleList