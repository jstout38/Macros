import Dropdown from 'react-bootstrap/Dropdown';
import { useUpdateJournalMutation, useFetchJournalQuery, useDeleteEntryMutation } from '../store';
import { useEffect, useState } from 'react';
import type { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../store/slices/macroSlice';
import MealItem from './MealItem';

export default function MealPicker(props: any) {
  
  const [ updateJournal, results ] = useUpdateJournalMutation();
  const [ deleteEntry, deleteResults ] = useDeleteEntryMutation();
  const { data, error, isLoading } = useFetchJournalQuery(props.date);

  const [ mealTotals, setMealTotals ] = useState<{[key: string]: number}>({
    'calories': 0,
    'fiber': 0,
    'fat': 0,
    'carbs': 0,
    'protein': 0,
  });

  
  const dispatch = useDispatch();
      

  useEffect(() => {
    if (!isLoading) {
      var calories = 0;
      var fiber = 0;
      var fat = 0;
      var carbs = 0;
      var protein = 0;
      if (data && data[props.meal].length > 0) {
        for (var i = 0; i < data[props.meal].length; i++) {
          calories += data[props.meal][i].food.calories
          fiber += data[props.meal][i].food.fiber
          fat += data[props.meal][i].food.fat
          carbs += data[props.meal][i].food.carbs
          protein += data[props.meal][i].food.protein
        }
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
  }, [data]);

  if (error) {
    console.log(error);
  }
  
  async function clickHandler(e: any) {
    var input = {
      date: props.date,
      food: e.target.id,
      meal: props.meal,
      quantity: 1,
    }
    updateJournal(input);
  }

  var food_list = <div>Start adding foods!</div>;

  if (data && !isLoading) {
    if (data[props.meal].length > 0) {
      food_list = data[props.meal].map((entry: any) => {
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
  
  var display = <Dropdown.Item>No foods added yet.</Dropdown.Item>;

  if (props.foods) {
    display = props.foods.map((entry: any) => {
      
      return <Dropdown.Item onClick={clickHandler} key={entry._id} id={entry._id}>{entry.name}</Dropdown.Item>
    })
  } 

  return (
    <div>
    <ul>{food_list}</ul>
    <Dropdown>
      <Dropdown.Toggle variant="success">
        Add a food
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {display}
      </Dropdown.Menu>
    </Dropdown>
    <div>Meal Totals - Calories: {mealTotals.calories} Protein: {mealTotals.protein} Carbs: {mealTotals.carbs} Fat: {mealTotals.fat} Fiber: {mealTotals.fiber}</div>
    </div>
  )
}
