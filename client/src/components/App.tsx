import React, { Component, PropsWithRef } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';

const Dashboard: React.FC = () => <h2>Dashboard</h2>
const SurveyNew: React.FC = () => <h2>SurveyNew</h2>
const Landing: React.FC = () => <h2>Landing</h2>


export default function App() {    
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