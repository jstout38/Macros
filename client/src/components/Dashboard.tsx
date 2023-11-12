import FoodPanel from './FoodPanel';
import Journal from './Journal';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Dashboard() {
  return (
    <Row>
    <Col xs={9}>
      <Link to={"/search"}><h2>Search for Foods!</h2></Link>
      <Journal />
    </Col>
    <Col>
      <FoodPanel />
    </Col>
    </Row>
    );
}