import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../css/styles.css";

import { useFetchUserQuery } from '../store';

import Header from './Header';
import Dashboard from './Dashboard';
import Landing from './Landing';

//Root App component on index.html page
export default function App() {    

  //Fetch current user
  const { data, error, isLoading } = useFetchUserQuery();

  //Only render app if user is logged in
  var displayApp;

  if (isLoading) {
    displayApp = <h1>Please wait</h1>
  } else if (error) {
    displayApp = <h1>Error loggin in</h1>
  } else {
    if (!data) {
      displayApp = <Landing />
    } else {
      displayApp = <Dashboard />
    }
  };

  //Always render Header, render app dashboard only if logged in according to above logic
  return (
    <Col className="app">          
        <Row className="header-row">
            <Header />
        </Row>
        <Row className="dashboard-row"> 
              {displayApp}
        </Row>
      </Col>
    );
};