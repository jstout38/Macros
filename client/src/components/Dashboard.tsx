import FoodPanel from './FoodPanel';
import Journal from './Journal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Dashboard() {
  return (
    <Row className="dashboard">
      <Col className="journal" xs={9}>
        <Journal />
      </Col>
      <Col>
        <FoodPanel />
      </Col>
    </Row>
    );
}