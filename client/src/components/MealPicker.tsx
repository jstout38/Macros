import Dropdown from 'react-bootstrap/Dropdown';
import { useUpdateJournalMutation, useFetchJournalQuery, useDeleteEntryMutation } from '../store';
import MealItem from './MealItem';

export default function MealPicker(props: any) {
  
  const [ updateJournal, results ] = useUpdateJournalMutation();
  const [ deleteEntry, deleteResults ] = useDeleteEntryMutation();
  const { data, error, isLoading } = useFetchJournalQuery(props.date);

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
          date={props.date}
          food={entry.food}
          meal={props.meal}
          quantity={entry.quantity}
        />;
      })
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
    </div>
  )
}
