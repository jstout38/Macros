import Button from 'react-bootstrap/Button';

interface MealProps {
  addMode: boolean;
}

export default function MealPicker(props: MealProps) {
  
  var display = <div></div>;

  if (!props.addMode) {
    display = <Button>Add Foods</Button>;
  } 

  return display;
}
