import AddFood from './AddFood';
import SearchForm from './SearchForm';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useFetchUserFoodQuery, useDeleteFoodMutation } from '../store';
import { Food } from '../store/apis/foodApi';

import { PlusSquare, Search, XSquareFill, PencilSquare } from 'react-bootstrap-icons';

export default function FoodPanel() {  

  type foodTemplate = {
    name: string,
    description: string,
    calories: number,
    fat: number,
    protein: number,
    carbs: number,
    fiber: number,
    edit: string | null
  }
  
  const { data, error, isLoading } = useFetchUserFoodQuery();
  const [ deleteFood, results ] = useDeleteFoodMutation();

  const [show, setShow] = useState(false);
  const [modalSearch, setModalSearch] = useState(false);
  const [foodTemplate, setFoodTemplate] = useState<foodTemplate>({
    name: '',
    description: '',
    calories: 0,
    fat: 0,
    protein: 0,
    carbs: 0,
    fiber: 0,
    edit: null,
  })

  const handleClose = () => {
    setShow(false);
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
  }
  const handleShow = () => setShow(true);

  var display = () => {  
    if (data) {
      return data.map((entry: Food) => (
        (<li className="foodPanelItem" key={entry._id}>
          <Row>
            <Col xs={8}>
              {entry.name}
            </Col>
            <Col xs={2}>          
              <PencilSquare onClick={() => editUserFood(entry._id)} />
            </Col>
            <Col xs={2}>
              <XSquareFill onClick={() => deleteUserFood(entry._id)} />          
            </Col>
          </Row>
        </li>)
      ));
    } else {
      return [<div key="blank"></div>];
    }
  };

  function deleteUserFood(id: string) {
    deleteFood(id);
  }

  function editUserFood(id: string) {    
    if (data) {
      var editFood = data.filter((entry: Food) => entry._id === id);
      
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
    }
    setModalSearch(false);
    handleShow();
  }

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
    modalDisplay = <AddFood submit={handleClose} name='' description='' calories={0} fat={0} protein={0} carbs={0} fiber={0} edit="null"/>;
  }, []);
  
  if (modalSearch) {
    modalDisplay = <SearchForm selectFood={selectFood}/>
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

  function selectFood(name: string, calories: number, protein: number, fat: number, carbs: number, fiber: number) {   
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
    <div>
      <div>        
        <Row className="foodHeader align-items-center" xs="auto">
          <Col xs={6} md={8}>
            <h3>Your Foods</h3>
          </Col>
          <Col xs={3} md={2} className="align-items-right">
            <PlusSquare onClick={startAdd} size={24}/>
          </Col>
          <Col xs={3} md={2} className="align-items-right">
            <Search onClick={startSearch} size={24}/>
          </Col>
        </Row>
        <ul className="foodPanelList">{display()}</ul>
      </div>

      <Modal fullscreen='sm-down' show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
            <Modal.Title>Update Your Foods!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalDisplay}
        </Modal.Body>        
      </Modal>
    </div>
  )
  
}

