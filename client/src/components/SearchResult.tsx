import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type SearchResultProps = {
  label: string,
  calories: string,
  protein: string,
  fat: string,
  carbs: string,
  fiber: string,
  foodImage: JSX.Element,
  selectFood: Function,
}

//Component for creating clickable serach result - data is passed from parent element as props
export default function SearchResult(props: SearchResultProps) {
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