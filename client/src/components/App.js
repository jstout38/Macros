import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
const Header = () => React.createElement("h2", null, "Header");
const Dashboard = () => React.createElement("h2", null, "Dashboard");
const SurveyNew = () => React.createElement("h2", null, "SurveyNew");
const Landing = () => React.createElement("h2", null, "Landing");
const App = () => {
    return (React.createElement("div", null,
        React.createElement(BrowserRouter, null,
            React.createElement("div", null,
                React.createElement(Route, { path: "/", component: Landing }),
                React.createElement(Route, { path: "/dashboard", component: Dashboard }),
                React.createElement(Route, { path: "/new", component: SurveyNew })))));
};
export default App;
