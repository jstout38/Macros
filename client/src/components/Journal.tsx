import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import GaugeChart from 'react-gauge-chart';
import '../css/styles.css';

import { useAddJournalMutation, useFetchUserFoodQuery } from '../store';

import MealPicker from './MealPicker';


export default function Journal() {
  
  const [ currentDate, setCurrentDate ] = useState(new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"}));  
  
  
  const [ addJournal, results ] = useAddJournalMutation();

  const { data, error, isLoading } = useFetchUserFoodQuery();  

  function getMealPicker(meal: any) {
    if (data) {
      
      return <MealPicker foods={data.foods} date={currentDate} meal={meal} />;
      
    } else {
      return <div>Loading...</div>;
    }
  }

  useEffect(() => {   
    addJournal(currentDate);
  }, []);

  const changeHandler = (e: any) => {
    var newDate = new Date(e.target.value);
    var date_string = new Date(newDate.getUTCFullYear(), newDate.getUTCMonth(), newDate.getUTCDate()).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"});
    addJournal(date_string);
    setCurrentDate(date_string);
  }

 

  return (
    <Container className="journalContainer">
      <Row className="journalHeader">
        <h4 >{currentDate}</h4>
        <Form>
          <Form.Group className="mb-3" controlId="DOB">
            
            <Form.Control onChange={changeHandler} type="Date" />
          </Form.Group>
        </Form>
      </Row>
      <Row>
        
      </Row>
      
      
        <Row className="mealPicker">
          {getMealPicker('breakfast')}
          {getMealPicker('lunch')}          
          {getMealPicker('dinner')}
          {getMealPicker('snacks')}
      
        
      </Row>
    </Container>
  )
}