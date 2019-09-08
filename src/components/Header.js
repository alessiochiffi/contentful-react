import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class Header extends Component {
  render() {
    return (
        <header className="App-header">
            <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
            </Link>
        </header>
    );
  }
}
export default Header;
