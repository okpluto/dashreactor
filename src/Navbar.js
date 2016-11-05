import React, { Component } from 'react';
import { Col } from 'react-bootstrap';


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.display
    }
    this.logout = this.logout.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({selected: nextProps.display})
  }

  logout() {
    localStorage.removeItem('userAuth')
    this.props.checkLogin()
  }

  render() {
    const { navbarStyle, menuItemStyle, selectedStyle, textStyle } = styles;
    const getStyle = (icon, selected) => {
      if (icon === selected) {
        return {...menuItemStyle, ...selectedStyle}
      } else {
        return menuItemStyle
      }
    }

    return (
      <Col className="Navbar" style={navbarStyle}>
       {/* <h2 className="brand" style={brandStyle}>Dash Reactor</h2>*/}
        <img alt="dashReactorLogo" src={require('../public/dashReactorLogo.png')} style={{marginLeft: 10, marginTop: -90}}/>
        <i className="fa fa-book fa-2x" aria-hidden="true" style={getStyle('lessons', this.state.selected)}></i>
        <br />

      {/*this 'users' option is not currently implemented - app is hard coded to open up lessons only.*/}
        <i className="fa fa-user fa-2x" aria-hidden="true" style={getStyle('user', this.state.selected)} onClick={this.logout}></i>
        <span style={textStyle} onClick={this.logout}>{(this.state.selected === 'lessons' ? 'Logout' : '')}</span>
      </Col>
    );
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'
const coral = '#FA848A'


const styles = {
  navbarStyle: {
    height: '100%',
    width: 50,
    position: 'fixed',
    paddingLeft: 20,
    paddingTop: 100,
    fontFamily: 'Lato',
  },

  menuItemStyle: {
    color: lightGrey,
    marginTop: 25,
    cursor: 'pointer',
    opacity: 0.4,
    display:'block',
    paddingLeft:20,
    fontSize: 50,
  },

  selectedStyle: {
    color: coral,
    opacity: 1,
  },

  textStyle : {
    color: lightGrey,
    paddingLeft: 18
  }
}

export default Navbar;
