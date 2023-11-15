import Dropdown from 'react-bootstrap/Dropdown';
import { useUpdateJournalMutation, useFetchJournalQuery } from '../store';


export default function MealPicker(props: any) {
  
  const [ updateJournal, results ] = useUpdateJournalMutation();
  const { data, error, isLoading } = useFetchJournalQuery(props.date);


  async function clickHandler(e: any) {
    console.log(e.target);
    var input = {
      date: props.date,
      food: e.target.id,
      meal: props.meal,
    }
    await updateJournal(input);
  }

  var food_list = <div>Start adding foods!</div>;

  if (data) {
    if (data.foods[props.meal].length > 0) {
      food_list = data.foods[props.meal].map((entry: any) => {
        return <li key={entry._id}>{entry.name}</li>
      })
    } else {
      food_list = <div>Start adding foods!</div>
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
