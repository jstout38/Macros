import AddFood from './AddFood';
import Search from './Search';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState, useEffect } from 'react';

import { useFetchUserFoodQuery, useDeleteFoodMutation } from '../store';

export default function FoodPanel() {
  
  const { data, error, isLoading } = useFetchUserFoodQuery();
  const [ deleteFood, results ] = useDeleteFoodMutation();

  const [show, setShow] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [foodTemplate, setFoodTemplate] = useState({
    name: '',
    description: '',
    calories: 0,
    fat: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    edit: null,
  })

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  var display = '';
  
  if (data) {
    display = data.foods.map((entry: any) => (
      <li key={entry._id.toString()}>
        <div>
          {entry.name}  
        </div>
        <div>
          <Button variant="link" onClick={() => deleteUserFood(entry._id)}>Delete</Button> | 
          <Button variant="link" onClick={() => editUserFood(entry._id)}>Edit</Button>
        </div>
      </li>)
    )
  };

  function deleteUserFood(id: any) {
    deleteFood(id);
  }

  function editUserFood(id: any) {    
    var editFood = data.foods.filter((entry: any) => entry._id === id);
    console.log(editFood);
    setFoodTemplate({
      name: editFood[0].name,
      description: editFood[0].description,
      calories: editFood[0].calories,
      fat: editFood[0].fat,
      protein: editFood[0].protein,
      carbs: editFood[0].carbs,
      fiber: editFood[0].fiber,
      edit: id,
    });
    setModalSearch(false);
    handleShow();
  }

  function startSearch() {
    setFoodTemplate({
      name: '',
      description: '',
      calories: 0,
      fat: 0,
      protein: 0,
      carbs: 0,
      fiber: 0,
      edit: null,
    });
    setModalSearch(true);
    handleShow();
  }

  function startAdd() {
    setModalSearch(false);
    handleShow();
  }

  var modalDisplay;

  useEffect (() => {
    modalDisplay = <AddFood submit={handleClose} name='' description='' calories={0} fat={0} protein={0} carbs={0} fiber={0} edit="null"/>;
  }, []);
  
  if (modalSearch) {
    modalDisplay = <Search selectFood={selectFood}/>
  } else {
    modalDisplay = <AddFood 
      submit={handleClose} 
      name={foodTemplate.name}
      description={foodTemplate.description} 
      calories={foodTemplate.calories} 
      fat={foodTemplate.fat} 
      protein={foodTemplate.protein} 
      carbs={foodTemplate.carbs}
      fiber={foodTemplate.fiber} 
      edit={foodTemplate.edit}
    />
  }

  function selectFood(name: string, calories: number, fat: number, protein: number, carbs: number, fiber: number) {   
    setFoodTemplate({
      name: name,
      description: '',
      calories: calories,
      fat: fat,
      protein: protein,
      carbs: carbs,
      fiber: fiber,
      edit: null,
    });
    setModalSearch(false);
  }

  return (
    <>
      <div>
        <Row>
          <Col>
            <Button variant="primary" onClick={startAdd}>
              Add a Custom Food
            </Button>
          </Col>
          <Col>
          <Button variant="secondary" onClick={startSearch}>
            Search for Foods
          </Button>
          </Col>
        </Row>
        <h3>Your Foods</h3>
        <ul>{display}</ul>
        
        
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Update Your Foods!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalDisplay}
        </Modal.Body>        
      </Modal>
    </>
  )
  
}