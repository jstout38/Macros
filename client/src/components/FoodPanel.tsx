import AddFood from './AddFood';
import SearchForm from './SearchForm';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useFetchUserFoodQuery, useDeleteFoodMutation } from '../store';
import { Food } from '../store/apis/foodApi';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { PlusSquare, Search, XSquareFill, PencilSquare, PatchQuestionFill } from 'react-bootstrap-icons';

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
        <Row className="foodHeader justify-contend-end m-0" xs="auto">
          <Col xs={8} >
            <Row className="g-0">
            <Col xs="auto">
                <OverlayTrigger
                  placement={"right"}
                  overlay={
                    <Tooltip>
                      Add custom foods or use the search to find food information from the database.
                    </Tooltip>
                  }
                >      
                  <PatchQuestionFill size={14} className="m-1 p-0 g-0 foodHelp"/>
                </OverlayTrigger>
              </Col>
              <Col xs="auto">
                <h4 className="g-0" >Foods</h4>
              </Col>
              
            </Row>
          </Col>
          <Col xs={4} className="d-flex p-0 flex-row justify-content-end">
            <PlusSquare className="m-1" onClick={startAdd} size={20}/>          
            <Search className="m-1" onClick={startSearch} size={20}/>
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

