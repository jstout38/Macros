import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import MealPicker from './MealPicker';


export default function Journal() {
  
  const [ currentDate, setCurrentDate ] = useState(new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"}));  
  const [ addMode, setAddMode ] = useState({"breakfast": false, "lunch": false, "dinner": false, "snacks": false})

  const changeHandler = (e: any) => {
    setCurrentDate(new Date(e.target.value).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"}));
  }

  return (
    <Container>
      <Row>
        <h4 className="journalHeader">{currentDate}</h4>
      </Row>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="DOB">
            <Form.Label>Jump to Day</Form.Label>
            <Form.Control onChange={changeHandler} type="Date" />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <Col>
          <h4>Breakfast</h4>
            <MealPicker addMode={addMode.breakfast}/>
          <h4>Lunch</h4>
            <MealPicker addMode={addMode.lunch}/>
          <h4>Dinner</h4>
            <MealPicker addMode={addMode.dinner}/>
          <h4>Snacks</h4>
            <MealPicker addMode={addMode.snacks}/>
        </Col>
      </Row>
    </Container>
  )
}