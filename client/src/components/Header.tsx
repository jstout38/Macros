import React, { Component } from 'react';

class Header extends Component {
  render() {
    return(
      <div>
        <div className="nav-wrapper">
          <a className="left brand-logo">
            Macros
          </a>
          <ul className="right">
            <li>
              <a>Login with Google</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;