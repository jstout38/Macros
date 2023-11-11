import Container from 'react-bootstrap/Container';
import { useFetchUserFoodQuery } from '../store';

export default function FoodPanel() {
  
  const { data, error, isLoading } = useFetchUserFoodQuery();

  console.log(data);

  var display = '';
  
  if (data) {
    display = data[0].name;
  };

  return (
    <div>
      {display}
    </div>
  )
  
}