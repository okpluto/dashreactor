import React, { Component } from 'react'
import { Button, Col } from 'react-bootstrap'

const lightGrey = '#A3A8AB'

const styles = {

  fontAwesomeStyle: {
    color: lightGrey,
    display: 'inline',
    paddingRight: 3,
  },

  answerInputStyle: {
    border: 'none',
    display: 'inline',
    color: '#7A7886'
  },
}

const { answerInputStyle, fontAwesomeStyle } = styles;
class Answer extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
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
                style={this.props.getAnswerCheckStyle(fontAwesomeStyle, this.props.index)}
                onClick={() => this.props.setAnswer(this.props.index)}></i>
          </div>

      </div>
    )
  }
}

export default Answer