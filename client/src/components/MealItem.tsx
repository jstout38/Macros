import { useDeleteEntryMutation, useUpdateJournalMutation } from '../store';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Food } from '../store/apis/foodApi';

import { XSquareFill } from 'react-bootstrap-icons';

type MealItemProps = {
  key: string,
  id: string,
  date: string,
  food: Food,
  meal: string,
  quantity: number,
}

//Component for creating a line for each food for each meal, with options to change quantity and delete
export default function MealItem(props: MealItemProps) {

  //RTK mutations for deleting and updating journal entries
  const [ deleteEntry, results ] = useDeleteEntryMutation();
  const [ updateEntry, updateResults ] = useUpdateJournalMutation();

  //Delete food by ID with RTK Query
  function deleteFood() {
    var input = {
      date: props.date,
      id: props.id,
      meal: props.meal,
    }
    deleteEntry(input);
  }  

  //On quantity change, update the quantity in the database
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    var input = {
      date: props.date,
      food: props.food._id,
      meal: props.meal,
      quantity: Number(e.target.value),
    }
    updateEntry(input);
  }

  //React bootstrap popover to allow user to see food details quickly - new componenet?
  const popover = (
    <Popover>
      <Popover.Header as="h3">{props.food.name}</Popover.Header>
      <Popover.Body>
        <div>
          {props.food.description}
        </div>
        <div>
          Calories: {props.food.calories}
        </div>
        <div>
          Protein: {props.food.protein}
        </div>
        <div>
          Carbs: {props.food.carbs}
        </div>
        <div>
          Fat: {props.food.fat}
        </div>
        <div>
          Fiber: {props.food.fiber}
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <li className = "mealItem">
      <Row>
        <Col xs={3} lg={2}>
          <Form>
            <Form.Group>
              <Form.Control id="quantity" onChange={handleChange} type="number" value={props.quantity}></Form.Control>
            </Form.Group> 
          </Form>
        </Col>     
        <Col xs={7} lg={8}>
          <OverlayTrigger placement="right" overlay={popover}>
            <span>{props.food.name}</span>
          </OverlayTrigger>
        </Col>          
        <Col>
          <XSquareFill onClick={deleteFood} />
            
        </Col>
      </Row>
    </li>
  );

}

