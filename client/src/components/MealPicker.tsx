import Dropdown from 'react-bootstrap/Dropdown';
import { useUpdateJournalMutation } from '../store';


export default function MealPicker(props: any) {
  
  const [ updateJournal, results ] = useUpdateJournalMutation();

  function clickHandler(e: any) {
    var input = {
      date: props.date,
      breakfast: props.meal === 'breakfast' ? e.target.id : '',
      lunch: props.meal === 'lunch' ? e.target.id : '',
      dinner: props.meal === 'dinner' ? e.target.id : '',
      snacks: props.meal === 'snacks' ? e.target.id: '',
    }
    console.log(input);
    updateJournal(input);
  }

  var display = <Dropdown.Item>No foods added yet.</Dropdown.Item>;

  if (props.foods) {
    display = props.foods.map((entry: any) => {
      
      return <Dropdown.Item onClick={clickHandler} key={entry._id} id={entry._id}>{entry.name}</Dropdown.Item>
    })
  } 

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success">
        Add a food
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {display}
      </Dropdown.Menu>
    </Dropdown>
  )
}
