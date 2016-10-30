import React, { Component } from 'react';


class QuestionTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    }
  }

  handleClick () {
    this.setState({clicked: !this.state.clicked});
    this.props.handleQuestionClick.call(this, this.props.questionContent)
  }

  render () {
    const { defaultStyle, selectedStyle } = styles;
    let titleStyle = this.state.clicked ? {...defaultStyle, ...selectedStyle} : defaultStyle
    return (
      <div style={titleStyle} onClick={this.handleClick.bind(this)}>
        <p>{this.props.title}</p>
      </div>
    )
  }
}

// const lightGrey = '#A3A8AB'
const coral = '#FA848A'



const styles = {
  defaultStyle: {
    width: '100%',
    backgroundColor: 'white',
    height: 60,
    paddingLeft: 25,
    fontFamily: 'Lato',
  },
  selectedStyle: {
    color: 'white',
    backgroundColor: coral,
    opacity: 1,
  }
}

export default QuestionTitle