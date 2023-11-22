import FoodPanel from './FoodPanel';
import Journal from './Journal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MacroTotals from './MacroTotals';


export default function Dashboard() {
  return (
    
    <Row className="dashboard">
      <Col className= "macroColumn d-flex flex-column" xs={2}>
        <MacroTotals />
      </Col>
      <Col className="journal" xs={8}>
        <Journal />
      </Col>
      
      <Col xs={2} className="foodPanel">
        <FoodPanel />
      </Col>
    </Row>
    );
}