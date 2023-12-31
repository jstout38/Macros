import Dropdown from 'react-bootstrap/Dropdown';
import { useUpdateJournalMutation, useFetchJournalQuery } from '../store';
import React, { useEffect, useState } from 'react';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/slices/macroSlice';
import MealItem from './MealItem';
import MealTotals from './MealTotals';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Food } from '../store/apis/foodApi';
import { EntryType } from '../store/apis/journalApi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { PatchQuestionFill } from 'react-bootstrap-icons';

type MealPickerProps = {
  foods:[Food],
  date: string,
  meal: string,
}
//Component for rendering and totaling calories for a meal - this is where meal calories are totalled and sent back
//to the RTK state
export default function MealPicker(props: MealPickerProps) {
  
  //Get updateJournal from state for updating journal records
  const [ updateJournal ] = useUpdateJournalMutation();

  //Fetch journal entries
  const { data, isLoading } = useFetchJournalQuery(props.date);

  //Create dispatch action for updating state
  const dispatch = useDispatch();
  
  //Load current daily totals from state
  var dailyTotals = useSelector((state: RootState) => state.macros);

  //State for showing modal for meal totals in mobile resolutions

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  //Whenever journal data is fetched for the meal, do the math to get the totals for the meal
  //then dispatch to update thes state
  useEffect(() => {
    if (!isLoading) {
      var calories = 0;
      var fiber = 0;
      var fat = 0;
      var carbs = 0;
      var protein = 0;
      if (data) {
        for (var i = 0; i < data[props.meal].length; i++) {
          var mealData = data[props.meal][i] as EntryType;
          calories += mealData.food.calories * mealData.quantity
          fiber += mealData.food.fiber * mealData.quantity
          fat += mealData.food.fat * mealData.quantity
          carbs += mealData.food.carbs * mealData.quantity
          protein += mealData.food.protein * mealData.quantity
        }
        dispatch(update({
          meal: props.meal,
          calories: calories,
          protein: protein,
          carbs: carbs,
          fat: fat,
          fiber: fiber,
        }));
      }
    }
  }, [data]);

  //When dropdown item is clicked create new entry in the journal record  
  function clickHandler(e: React.MouseEvent<HTMLElement>){
    var T = e.target as HTMLElement;
    var input = {
      date: props.date,
      food: T.id,
      meal: props.meal,
      quantity: 1,
    }
    updateJournal(input);
  }

  //Default display if no foods are added/fetched yet
  var food_list = () => {
    if (data && !isLoading) {
      if (data[props.meal].length > 0) {
        var mealData = data[props.meal] as [EntryType];
        return mealData.map((entry: EntryType) => {
          return <MealItem 
            key={entry._id}
            id={entry._id}
            date={props.date}
            food={entry.food}
            meal={props.meal}
            quantity={entry.quantity}
          />;
        });
      } else {
        return <div>Start adding foods!</div>;
      }
    }
  } 
  
  var display;

  //Accept the user's overall foodlist via props and create dropdown component via React Bootstrap
  if (props.foods.length > 0) {
    display = props.foods.map((entry: Food) => {      
      return <Dropdown.Item onClick={clickHandler} key={entry._id} id={entry._id}>{entry.name}</Dropdown.Item>
    })
  } else {
    display = <Dropdown.Item>No foods added yet.</Dropdown.Item>
  }

  const displayPickerTooltip = (
    <OverlayTrigger
      placement={"left"}
      overlay={
        <Tooltip>
          Add foods to your account first, then you will be able to select them for each meal.
        </Tooltip>
      }
    >      
      <PatchQuestionFill size={24} className="pickerHelp"/>
    </OverlayTrigger>
  )

  return (  
    <Row className="mealPicker">
      <Col className="mealPickerColumn">
        
        <Row className="mealPickerHeader" xs="auto">      
        
          <Col xs={7}>
            <h4>{props.meal.charAt(0).toUpperCase() + props.meal.slice(1)}</h4>
          </Col>
          <Col xs={5}>
            <Row className="d-flex flex-row justify-content-end">
            <Col xs="auto" className="align-self-center">
              {props.meal === "breakfast" ? displayPickerTooltip : <div></div>}          
            </Col>
            <Col xs="auto">
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  Add
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {display}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            
            </Row>
          </Col>
        </Row>    
        <ul className="mealPickerFoodList">{food_list()}</ul>
        <Button onClick={handleOpen} className="bg-success mealTotalsButton">See {props.meal.charAt(0).toUpperCase() + props.meal.slice(1)} Totals</Button>
      </Col>      
      <Col className="mealTotalColumn" xs={3}>
        <MealTotals 
          calories={dailyTotals[props.meal].calories} 
          protein={dailyTotals[props.meal].protein} 
          carbs={dailyTotals[props.meal].carbs} 
          fat={dailyTotals[props.meal].fat} 
          fiber={dailyTotals[props.meal].fiber} 
        />
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>{props.meal.charAt(0).toUpperCase() + props.meal.slice(1)}</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            <MealTotals
              calories={dailyTotals[props.meal].calories} 
              protein={dailyTotals[props.meal].protein} 
              carbs={dailyTotals[props.meal].carbs} 
              fat={dailyTotals[props.meal].fat} 
              fiber={dailyTotals[props.meal].fiber} 
            />
          </Modal.Body>        
      </Modal>    
    </Row>
  )
}
