import FoodPanel from './FoodPanel';
import Journal from './Journal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function Dashboard() {
  return (
    <Row class="dashboard">
      <Col class="journal" xs={9}>
        <Journal />
      </Col>
      <Col>
        <FoodPanel />
      </Col>
    </Row>
    );
}