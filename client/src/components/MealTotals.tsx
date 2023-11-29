import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type MealTotalsProps = {
  [index: string]: number,
}

//Component for displaying mealtotals passed as props from the MealPicker component
export default function MealTotals (props: MealTotalsProps) {
  
  const macros = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
  const colors = ['bg-danger', 'bg-success', 'bg-primary', 'custom-yellow', 'bg-secondary'];
  const containers = [];
  for (var i = 0; i < macros.length; i++) {
    containers.push(
      <Row key={i} className = {colors[i] + " text-light mealTotal"}>       
        <h4 className="m-1 macro-item">{macros[i][0].toUpperCase() + macros[i].slice(1)}: {props[macros[i]]}</h4>            
      </Row>    
    );
  };

  return <Col>{containers}</Col>
}