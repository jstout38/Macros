import React from 'react';
import Update from './Update';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/styles.css";

import { useFetchUserQuery } from '../store';

import Header from './Header';
import Dashboard from './Dashboard';



const App: React.FC = () => {    

  const { data, error, isLoading } = useFetchUserQuery();

  var displayApp;

  if (isLoading) {
    displayApp = <h1>Please wait</h1>
  } else if (error) {
    displayApp = <h1>Error loggin in</h1>
  } else {
    if (!data) {
      displayApp = <h1>Log in to get started!</h1>
    } else {
      displayApp = <Dashboard />
    }
  };

    return (
      <Col className="app d-flex flex-column">          
            <Row classname="header-row">
              <Header />
            </Row>
            <Row className="dashboard-row"> 
              {displayApp}
            </Row>
      </Col>
    );
};

export default App;