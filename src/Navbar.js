import React, { Component } from 'react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'lessons'
    }
  }


  render() {
    const { navbarStyle, brandStyle, menuItemStyle, selectedStyle } = styles;

    return (
      <div className="Navbar col-md-1" style={navbarStyle}>
        <h2 className="brand" style={brandStyle}>Dash Reactor</h2>
        <i className="fa fa-book fa-2x" aria-hidden="true" style={{...menuItemStyle, ...selectedStyle}}></i>
        <br />
        <i className="fa fa-user fa-2x" aria-hidden="true" style={menuItemStyle}></i>
      </div>
    );
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'

const styles = {
  navbarStyle: {
    height: '100%',
    backgroundColor: '#2c3e50',
    position: 'fixed',
    paddingLeft: 20,
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
    opacity: 0.4,
  },
  selectedStyle: {
    color: 'white',
    opacity: 1,
  }
}

export default Navbar;
