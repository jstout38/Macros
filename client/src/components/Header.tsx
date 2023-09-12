import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    console.log(this.props);
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

function mapStateToProps(state: any) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);