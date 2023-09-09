import React, { Component, PropsWithRef } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';

const Dashboard: React.FC = () => <h2>Dashboard</h2>
const SurveyNew: React.FC = () => <h2>SurveyNew</h2>
const Landing: React.FC = () => <h2>Landing</h2>

interface MyProps {
  fetchUser : any;
}

class App extends Component<MyProps> {  
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
    };
};

export default connect(null, actions)(App);