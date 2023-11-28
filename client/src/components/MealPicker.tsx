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
import { foodType } from './FoodPanel';

type MealPickerProps = {
  foods:[foodType],
  date: string,
  meal: string,
}

type EntryType = {
  date: string,
  food: foodType,
  meal: string,
  quantity: number,
  user: string,
  _id: string
}

//Component for rendering and totaling calories for a meal - this is where meal calories are totalled and sent back
//to the RTK state
export default function MealPicker(props: MealPickerProps) {
  
  //Get updateJournal from state for updating journal records
  const [ updateJournal, results ] = useUpdateJournalMutation();

  //Fetch journal entries
  const { data, error, isLoading } = useFetchJournalQuery(props.date);

  //Create dispatch action for updating state
  const dispatch = useDispatch();
  
  //Load current daily totals from state
  var dailyTotals = useSelector((state: RootState) => state.macros);

  //Whenever journal data is fetched for the meal, do the math to get the totals for the meal
  //then dispatch to update thes state
  useEffect(() => {
    if (!isLoading) {
      var calories = 0;
      var fiber = 0;
      var fat = 0;
      var carbs = 0;
      var protein = 0;
      if (data && data[props.meal].length > 0) {
        for (var i = 0; i < data[props.meal].length; i++) {
          calories += data[props.meal][i].food.calories * data[props.meal][i].quantity
          fiber += data[props.meal][i].food.fiber * data[props.meal][i].quantity
          fat += data[props.meal][i].food.fat * data[props.meal][i].quantity
          carbs += data[props.meal][i].food.carbs * data[props.meal][i].quantity
          protein += data[props.meal][i].food.protein * data[props.meal][i].quantity
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
  var food_list = <div>Start adding foods!</div>;

  //Create MealItem component for existing meals
  if (data && !isLoading) {
    if (data[props.meal].length > 0) {
      food_list = data[props.meal].map((entry: EntryType) => {
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
      food_list = <div>Start adding foods!</div>;
    }
  }
  
  var display;

  //Accept the user's overall foodlist via props and create dropdown component via React Bootstrap
  if (props.foods) {
    display = props.foods.map((entry: foodType) => {      
      return <Dropdown.Item onClick={clickHandler} key={entry._id} id={entry._id}>{entry.name}</Dropdown.Item>
    })
  } else {
    display = [<Dropdown.Item>No foods added yet.</Dropdown.Item>]
  }

  return (  
    <Row className="mealPicker">
      <Col className="mealPickerColumn">
        <Row className="mealPickerHeader" xs="auto">      
          <Col xs={8} lg={10}>
            <h4>{props.meal.charAt(0).toUpperCase() + props.meal.slice(1)}</h4>
          </Col>
          <Col xs={4} lg={2}>
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
        <ul className="mealPickerFoodList">{food_list}</ul>
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
    </Row>
  )
}
