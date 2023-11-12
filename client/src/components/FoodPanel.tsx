import Container from 'react-bootstrap/Container';
import { useFetchUserFoodQuery } from '../store';

export default function FoodPanel() {
  
  const { data, error, isLoading } = useFetchUserFoodQuery();

  console.log(data);

  var display = '';
  
  var foodList;

  if (data) {
    display = data.map((entry: any) => <li key={entry._id.toString()}>{entry.name}</li>)
  };

  return (
    <div>
      <h3>Your Foods</h3>
      <ul>{display}</ul>
    </div>
  )
  
}