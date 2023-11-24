import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MealTotals (props: any) {
  
  const macros = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
  const colors = ['bg-danger', 'bg-success', 'bg-primary', 'bg-warning', 'bg-secondary'];
  const containers = [];
  for (var i = 0; i < macros.length; i++) {
    containers.push(
      <Row key={i} className = {colors[i] + " position-relative text-light align-content-center mealTotal"}>       
        <h4 className="macro-item">{macros[i][0].toUpperCase() + macros[i].slice(1)}: {props[macros[i]]}</h4>            
      </Row>    
    );
  };

  return <Col className="flex-column justify-content-evenly g-0 m-0 p-0 mealTotalColumn">{containers}</Col>
}