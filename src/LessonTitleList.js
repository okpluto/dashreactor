import React, { Component } from 'react';
import LessonDummyData from './LessonDummyData';
import LessonTitle from './LessonTitle';
import { Col } from 'react-bootstrap';



class LessonTitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lessons: LessonDummyData,
      clicked: ''
    }
  }

  render () {
    const { LessonTitleListStyle } = styles;

    return (
      <Col sm={3} style={LessonTitleListStyle} >
        {
          this.state.lessons.map(lesson => {
            return (
              <LessonTitle
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
    // backgroundColor: 'lightGrey',
    position: 'fixed',
    paddingTop: 100,
    paddingRight: 0,
    paddingLeft:0,
    marginLeft: 100,
    fontFamily: 'Lato',
    zIndex: -1,
  },
}

export default LessonTitleList