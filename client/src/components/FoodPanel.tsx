import AddFood from './AddFood';
import Search from './Search';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useState, useEffect } from 'react';

import { useFetchUserFoodQuery } from '../store';

export default function FoodPanel() {
  
  const { data, error, isLoading } = useFetchUserFoodQuery();

  const [show, setShow] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [foodTemplate, setFoodTemplate] = useState({
    name: '',
    calories: 0,
    fat: 0,
    protein: 0,
    carbs: 0,
    fiber: 0
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var display = '';
  
  if (data) {
    display = data.foods.map((entry: any) => <li key={entry._id.toString()}>{entry.name}</li>)
  };

  function startSearch() {
    setModalSearch(true);
    handleShow();
  }

  function startAdd() {
    setModalSearch(false);
    handleShow();
  }

  var modalDisplay;

  useEffect (() => {
    modalDisplay = <AddFood submit={handleClose} name='' calories={0} fat={0} protein={0} carbs={0} fiber={0}/>;
  }, []);
  
  if (modalSearch) {
    modalDisplay = <Search selectFood={selectFood}/>
  } else {
    modalDisplay = <AddFood 
      submit={handleClose} 
      name={foodTemplate.name} 
      calories={foodTemplate.calories} 
      fat={foodTemplate.fat} 
      protein={foodTemplate.protein} 
      carbs={foodTemplate.carbs}
      fiber={foodTemplate.fiber} 
    />
  }

  function selectFood(name: string, calories: number, fat: number, protein: number, carbs: number, fiber: number) {   
    setFoodTemplate({
      name: name,
      calories: calories,
      fat: fat,
      protein: protein,
      carbs: carbs,
      fiber: fiber,
    });
    setModalSearch(false);
  }

  return (
    <>
      <div>
        <h3>Your Foods</h3>
        <ul>{display}</ul>
        <Button variant="primary" onClick={startAdd}>
          Add a Custom Food
        </Button>
        <Button variant="secondary" onClick={startSearch}>Search for Foods</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add a Food</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalDisplay}
        </Modal.Body>        
      </Modal>
    </>
  )
  
}