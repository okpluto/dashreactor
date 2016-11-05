import React, { Component } from 'react'

const fontAwesomeStyle = {
  display: 'inline',
  paddingRight: 3,
}

const  answerInputStyle = {
  border: 'none',
  display: 'inline',
  color: '#7A7886'
}

class Answer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  setCheckColor() {
    let styleCopy = {}
    for (var key in fontAwesomeStyle) {
      styleCopy[key] = fontAwesomeStyle[key]
    }
    styleCopy.color = this.props.color
    return styleCopy
  }

  handleChange(event) {
    let index = this.props.index
    this.props.change('choice', index, event.target.value)
  }

  render() {
    return (
      <div>
          <div>
            <input
              style={answerInputStyle}
              placeholder="..."
              value={this.props.choice}
              onChange={this.handleChange}/>
              <i className="fa fa-check-circle"
                aria-hidden="true"
                style={this.setCheckColor()}
                onClick={() => this.props.setAnswer(this.props.index)}></i>
          </div>

      </div>
    )
  }
}

export default Answer