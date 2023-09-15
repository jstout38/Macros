import React, { Component } from 'react';
import { connect } from 'react-redux';

interface MyProps {
  auth: any
}

class Header extends Component<MyProps> {
  renderContent() {
    switch (this.props.auth) {
      case null: 
        return 'Still deciding';
      case false:
        return 'im loggedout';
      default:
        return 'im logged in';
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
              {this.renderContent()};
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