import Container from "react-bootstrap/Container";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Landing() {
  return (
  <Col xs={12}>
    <Row xs={12}>
      <img className="landingLogo" src={require('../images/m.png')} />
    </Row>
    <Row xs={12}>
      <h1 className="landingText">Macros Tracker App</h1>
    </Row>
    <Row xs={12}>
      <h3 className="landingText">Log in to Get Started</h3>
    </Row>
  </Col>
  )
}