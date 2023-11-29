import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAddJournalMutation, useFetchUserFoodQuery } from '../store';
import { useDispatch } from 'react-redux';
import { resetMacros } from '../store/slices/macroSlice';
import MealPicker from './MealPicker';

type JournalProps = {
  showMacroModal: () => void,
}

//Jounral container element that contians a calendar input ofr selecting date and meal picker elements for each meal
//RTK Query handling for creating new journal dates happens here
//Food info for each day is also fetched here and passed down to the meal picker eleements
export default function Journal(props: JournalProps) {
  
  //Create state with the current date - all dates are normalized to a string
  const [ currentDate, setCurrentDate ] = useState(
    new Date().toLocaleDateString(
      'en-us', 
      { weekday: "long", year: "numeric", month: "short", day:"numeric"}
    )
  );   
    
  //Use RTK Query to add new journal entries for newly accessed dates
  const [ addJournal, results ] = useAddJournalMutation();

  //RTK Query for fetching all of a user's foods for a date
  const { data, error, isLoading } = useFetchUserFoodQuery();  

  //Dispatch for resetting slices
  const dispatch = useDispatch();

  //Function for creating a new MealPicker component for a meal passed by string
  //If fetching is not complete display Loading...
  function getMealPicker(meal: string) {
    if (data) {      
      return <MealPicker foods={data} date={currentDate} meal={meal} />;      
    } else {
      return <div>Loading...</div>;
    }
  }
  //Create a new journal entry for the current date if it does not exist on load
  useEffect(() => {   
    addJournal(currentDate);
  }, []);

  //Whenever a user selects a new date create a normalized string for that date and create a new journal entry
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    var newDate = new Date(e.target.value);
    var date_string = new Date(
      newDate.getUTCFullYear(), 
      newDate.getUTCMonth(), 
      newDate.getUTCDate()).toLocaleDateString(
        'en-us', 
        { weekday: "long", year: "numeric", month: "short", day:"numeric"}
      );
    dispatch(resetMacros());
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
        <Button onClick={props.showMacroModal} className="bg-success macroShowButton">See Your Daily Totals</Button>
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