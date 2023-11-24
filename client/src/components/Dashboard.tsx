import FoodPanel from './FoodPanel';
import Journal from './Journal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MacroTotals from './MacroTotals';


export default function Dashboard() {
  return (
    
    <Row className="dashboard position-relative g-0">
       
       <Col xs={4} xl={2} className="foodPanel g-0">
        <FoodPanel />
      </Col>

      <Col className= "macroColumn" xs={2}>
        <MacroTotals />
      </Col>

      <Col className="journal" xs={8}>
        <Journal />
      </Col>

  

      
      

     
    </Row>
    );
}