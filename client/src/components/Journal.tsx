import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { useAddJournalMutation, useFetchUserFoodQuery } from '../store';

import MealPicker from './MealPicker';


export default function Journal() {
  
  const [ currentDate, setCurrentDate ] = useState(new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"}));  

  const [ addJournal, results ] = useAddJournalMutation();

  const { data, error, isLoading } = useFetchUserFoodQuery();

  function getMealPicker(meal: any) {
    if (data) {
      return <MealPicker foods={data} date={currentDate} meal={meal} />;
    } else {
      return <div>Loading...</div>;
    }
  }

  useEffect(() => {
    addJournal(currentDate);
  }, [currentDate]);

  const changeHandler = (e: any) => {
    var newDate = new Date(e.target.value);
    setCurrentDate(new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate()).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"}));
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
            {getMealPicker('breakfast')}
          <h4>Lunch</h4>
            {getMealPicker('lunch')}
          <h4>Dinner</h4>
            {getMealPicker('dinner')}
          <h4>Snacks</h4>
            {getMealPicker('snacks')}
        </Col>
      </Row>
    </Container>
  )
}