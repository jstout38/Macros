import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';

import { useAddJournalMutation, useFetchUserFoodQuery } from '../store';

import MealPicker from './MealPicker';


export default function Journal() {
  
  const [ currentDate, setCurrentDate ] = useState(new Date().toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day:"numeric"}));  
  const [ macroTotals, setMacroTotals ] = useState<macroList>({
    "calories" : 0,
    "protein": 0,
    "carbs": 0,
    "fat": 0,
    "fiber": 0
  });
  
  const [ addJournal, results ] = useAddJournalMutation();

  const { data, error, isLoading } = useFetchUserFoodQuery();
  
  var displayCals = useSelector((state: RootState) => state.macros["breakfast"].calories);


  var dailyTotals = useSelector((state: RootState) => state.macros);

  type macroList = {
    [index: string]: number
  }

  useEffect(() => {
    var newTotals = {
        "calories": Math.round(dailyTotals["breakfast"].calories + dailyTotals["lunch"].calories + dailyTotals["dinner"].calories + dailyTotals["snacks"].calories),
        "protein": Math.round(dailyTotals["breakfast"].protein + dailyTotals["lunch"].protein + dailyTotals["dinner"].protein + dailyTotals["snacks"].protein),
        "carbs": Math.round(dailyTotals["breakfast"].carbs + dailyTotals["lunch"].carbs + dailyTotals["dinner"].carbs + dailyTotals["snacks"].carbs),
        "fat": Math.round(dailyTotals["breakfast"].fat + dailyTotals["lunch"].fat + dailyTotals["dinner"].fat + dailyTotals["snacks"].fat),
        "fiber": Math.round(dailyTotals["breakfast"].fiber + dailyTotals["lunch"].fiber + dailyTotals["dinner"].fiber + dailyTotals["snacks"].fiber),
    };
    setMacroTotals(newTotals);  
    
  }, [dailyTotals]);
  

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

  function makeMacroColumn () {
    const macros = ['calories', 'protein', 'carbs', 'fat', 'fiber'];
    const colors = ['bg-danger', 'bg-success', 'bg-primary', 'bg-warning', 'bg-secondary'];
    const containers = [];
    for (var i = 0; i < macros.length; i++) {
      containers.push(
        <Col key={i} className = {colors[i] + " text-light flex-grow-1 align-content-center"}>
          
            <Row className="align-content-center">
              <h4 className="macro-item">Total {macros[i]}</h4>
            </Row>
            <Row className="align-content-center">
              <h4 className="macro-item">{macroTotals[macros[i]]}</h4>
            </Row>
          
        </Col>
      );
    }
    return containers;
  }

  return (
    <Container className="journalContainer">
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
      <Row className= "d-flex flex-row macroRow">
          {makeMacroColumn()}
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