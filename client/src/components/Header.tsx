import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null: 
        return 'Still deciding';
      case false:
        return 'imloggedout';
      default;
    }
  }
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