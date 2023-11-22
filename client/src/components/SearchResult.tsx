import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { JsxElement } from 'typescript';

export default function SearchResult(props: any) {
  const submitFood = () => {    
    props.selectFood(props.label, props.calories, props.protein, props.fat, props.carbs, props.fiber);
  }

  return (
    <li className="searchResults" onClick={submitFood}>
      <Row xs="auto">
          <Col className="searchImage">
            {props.foodImage}
          </Col>
          <Col>
            <div>{props.label}</div>
            <div>Calories: {props.calories} Protein: {props.protein} Fat: {props.fat} Carbs: {props.carbs} Fiber: {props.fiber}</div>
          </Col>
        </Row>
    </li>
  );
}