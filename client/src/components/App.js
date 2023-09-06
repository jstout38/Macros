import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
const Dashboard = () => React.createElement("h2", null, "Dashboard");
const SurveyNew = () => React.createElement("h2", null, "SurveyNew");
const Landing = () => React.createElement("h2", null, "Landing");
const App = () => {
    return (React.createElement("div", null,
        React.createElement(BrowserRouter, null,
            React.createElement("div", null,
                React.createElement(Header, null),
                React.createElement(Route, { exact: true, path: "/", component: Landing }),
                React.createElement(Route, { exact: true, path: "/surveys", component: Dashboard }),
                React.createElement(Route, { path: "/surveys/new", component: SurveyNew })))));
};
export default App;
