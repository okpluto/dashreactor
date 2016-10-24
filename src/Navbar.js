import React, { Component } from 'react';

class Navbar extends Component {



  render() {
    const { navbarStyle, brandStyle, menuItemStyle } = styles;

    return (
      <div className="Navbar col-md-4" style={navbarStyle}>
        <h2 className="brand" style={brandStyle}>Dash Reactor</h2>
        <i className="fa fa-book fa-2x" aria-hidden="true"></i>
        <i className="fa fa-user fa-2x" aria-hidden="true"></i>
        <h4 style={menuItemStyle}>Lessons</h4>
        <h4 style={menuItemStyle}>Users</h4>
      </div>
    );
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'

const styles = {
  navbarStyle: {
    height: '100%',
    backgroundColor: 'transparent',
    position: 'fixed',
    paddingLeft: 70,
    paddingTop: 100,
    fontFamily: 'Lato',
  },
  brandStyle: {
    color: darkGrey,
  },
  menuItemStyle: {
    color: lightGrey,
    marginTop: 25,
    cursor: 'pointer',

  }
}

export default Navbar;
