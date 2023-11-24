import { useState, useEffect } from 'react';
import { useDeleteEntryMutation, useUpdateJournalMutation } from '../store';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { XSquareFill } from 'react-bootstrap-icons';



export default function MealItem(props: any) {

  const [ currentQuantity, setCurrentQuantity ] = useState(1);
  const [ deleteEntry, results ] = useDeleteEntryMutation();
  const [ updateEntry, updateResults ] = useUpdateJournalMutation();

  function deleteFood() {
    var input = {
      date: props.date,
      id: props.id,
      meal: props.meal,
    }
    deleteEntry(input);
  }

  function updateQuantity() {
    
  }

  function handleChange(e: any) {
    setCurrentQuantity(e.target.value);
    var input = {
      date: props.date,
      food: props.food._id,
      meal: props.meal,
      quantity: e.target.value,
    }
    updateEntry(input);
  }

  var foodName = '';
  var existingQuantity = 1;

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


  if (props.food) {
    foodName = props.food.name;
  }

  return (
    <li className = "mealItem">
      <Row>
        <Col xs={2}>
          <Form>
            <Form.Group>
              <Form.Control id="quantity" onChange={handleChange} type="number" value={props.quantity}></Form.Control>
            </Form.Group> 
          </Form>
        </Col>     
        <Col xs={8}>
          <OverlayTrigger placement="right" overlay={popover}>
            <span>{foodName}</span>
          </OverlayTrigger>
        </Col>          
        <Col>
          <XSquareFill onClick={deleteFood} />
            
        </Col>
      </Row>
    </li>
  );

}

