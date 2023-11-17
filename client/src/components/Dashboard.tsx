import FoodPanel from './FoodPanel';
import Journal from './Journal';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Dashboard() {
  return (
    <Row>
    <Col xs={9}>
      <Journal />
    </Col>
    <Col>
      <FoodPanel />
    </Col>
    </Row>
    );
}