import React, { Component } from 'react';
import { Button, Col } from 'react-bootstrap'


class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleSignInClick = this.handleSignInClick.bind(this)
  }


  handleSignInClick() {
    let self = this
    let url=`api/users/signin`;
    const data = {
      username: this.state.username,
      password: this.state.password
    };
    const json = JSON.stringify(data);
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: json
    })
    .then(response => {
      if (response.status === 404) {
        return this.setState({
          errorMessage: 'User does not exist',
          username: '',
          password:''
        });
      } else if (response.status === 401){
        return this.setState({
          errorMessage: 'Username or password do not match',
          username: '',
          password:''
        });
      } else {
        return response.json();
      }
    })
    .then(res => {
      if (res) {
        localStorage.setItem('userAuth', JSON.stringify({'jwt': res.token, 'id': res.id}))
        self.props.checkLogin()
      }
    })
  }

  handleDownload() {
    let url = 'api/download';
    fetch(url)
    .then(file => {
      var data = new Blob([file], {type: 'application/vnd.android.package-archive'})
      var apkURL = window.URL.createObjectURL(data);
      var tempLink = document.createElement('a');
      tempLink.href = apkURL;
      tempLink.setAttribute('download', 'app-release.apk');
      tempLink.click();
    })
  }

  render() {
    const { signinStyle, cardStyle, textStyle, darkTextStyle, lightTextStyle, textInputStyle, downloadStyle } = styles;
    return (
      <Col sm={6} style={signinStyle}>
        <span style={darkTextStyle}>Welcome to Scripty's Lesson Creator</span>
        <div>
          <input
            style={textInputStyle}
            placeholder={"username"}
            value={this.state.username}
            onChange={ (event) => this.setState({username: event.target.value})}
          /><br />
          <input
            type={"password"}
            style={textInputStyle}
            value={this.state.password}
            placeholder={"password"}
            onChange={(event) => this.setState({password: event.target.value})}
          />
        </div>
        <Button onClick={this.handleSignInClick} style={cardStyle} >
          <span style={lightTextStyle}>Sign In</span>
        </Button><br />
        <span style={darkTextStyle}>{this.state.errorMessage}</span><br />
        <i className="fa fa-arrow-circle-down fa-3x" style={{marginLeft: 110, marginTop: 30}} aria-hidden="true" onClick={this.handleDownload}></i>
        <br />
        <span style={downloadStyle} onClick={this.handleDownload}>Download mobile app for Android</span>

      </Col>
    )
  }
}



const coral = '#FA848A'
const darkCoral = '#DE757A'
const grey = '#FAFAFA'

const styles = {
  signinStyle: {
    height: '100%',
    fontSize: 20,
    backgroundColor: 'white',
    position: 'fixed',
    paddingTop: 60,
    paddingRight: 0,
    paddingLeft:15,
    marginLeft: 100,
    fontFamily: 'Lato',
    zIndex: 0,
    boxShadow: '-2px 0px 5px -2px rgba(0,0,0,0.2)',
  },
  downloadStyle: {
    fontSize: 20,
    height: 60
  },
  cardStyle: {
    height: 50,
    marginTop: 20,
    borderRadius: 5,
    position: 'relative',
    backgroundColor: coral,
  },
  darkTextStyle: {
    color: coral,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  lightTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textInputStyle: {
    height: 50,
    backgroundColor: 'white',
    marginTop: 20,
    borderRadius: 5,
    borderColor: coral,
    borderWidth: 1,
    color: 'grey',
    fontSize: 20,
    textAlign: 'center'

  }
}


export default SignInForm;
