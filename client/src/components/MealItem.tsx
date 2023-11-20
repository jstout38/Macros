import { useState, useEffect } from 'react';
import { useDeleteEntryMutation, useUpdateJournalMutation } from '../store';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
    var input = {
      date: props.date,
      food: props.food._id,
      meal: props.meal,
      quantity: currentQuantity,
    }
    updateEntry(input);
  }

  function handleChange(e: any) {
    setCurrentQuantity(e.target.value);
  }

  var foodName = '';
  var existingQuantity = 1;

  if (props.food) {
    foodName = props.food.name;
  }

  if (props.quantity) {
    existingQuantity = props.quantity;
  }

  var quantityString = "1";

  if (currentQuantity) {
    quantityString = currentQuantity.toString();
  }



  return (
    <li>
      
      
      <Form>
        <Row>
        <Col xs={5}>{foodName} Qty: {existingQuantity}</Col>
        <Col xs={2}>
        <Form.Group>
          <Form.Control id="quantity" onChange={handleChange} type="number" placeholder={quantityString}></Form.Control>
        </Form.Group> 
        </Col>
        <Col xs={3}>
        <Button variant="primary" onClick={updateQuantity}>Update Quantity</Button>
        </Col>
        <Col xs={2}>
        <Button variant="danger" onClick={deleteFood} size="sm">
          X
        </Button>
        </Col>
        </Row>
      </Form>

    </li>
  );

}

