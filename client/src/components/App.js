import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
const Dashboard = () => React.createElement("h2", null, "Dashboard");
const SurveyNew = () => React.createElement("h2", null, "SurveyNew");
const Landing = () => React.createElement("h2", null, "Landing");
class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (React.createElement("div", { className: "container" },
            React.createElement(BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement(Header, null),
                    React.createElement(Route, { exact: true, path: "/", component: Landing }),
                    React.createElement(Route, { exact: true, path: "/surveys", component: Dashboard }),
                    React.createElement(Route, { path: "/surveys/new", component: SurveyNew })))));
    }
    ;
}
;
export default connect(null, actions)(App);
