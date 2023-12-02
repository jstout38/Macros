import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function Landing() {
  return (
  <Col className="d-flex flex-column justify-content-evenly landingColumn" xs={12}>
    <Row className= "d-flex" xs={12}>
      <img alt="MacroTracker App" className="landingLogo" src={require('../images/m.png')} />
    </Row>
    <Row className="d-flex" xs={12}>
      <h1 className="landingText">Macros Tracker App</h1>
    </Row>
    <Row className="d-flex" xs={12}>
      <h3 className="landingText">Log in to Get Started</h3>
    </Row>
  </Col>
  )
}