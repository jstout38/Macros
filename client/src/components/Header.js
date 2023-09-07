import React, { Component } from 'react';
class Header extends Component {
    render() {
        return (React.createElement("div", null,
            React.createElement("div", { className: "nav-wrapper" },
                React.createElement("a", { className: "left brand-logo" }, "Macros"),
                React.createElement("ul", { className: "right" },
                    React.createElement("li", null,
                        React.createElement("a", null, "Login with Google"))))));
    }
}
export default Header;
