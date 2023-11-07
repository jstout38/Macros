import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { FoodForm } from '../store/apis/foodApi';
import { useAddFoodMutation } from '../store';
import { useLocation } from 'react-router-dom';

export default function AddFood() {
  
  const [fields, setFields] = useState<FoodForm>({
    formName: '',
    formDescription: '',
    formCals: 0,
    formProt: 0,
    formCarbs: 0,
    formFat: 0,
    formFiber: 0
    });
  
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setFields({
        formName: location.state.name,
        formDescription: '',
        formCals: location.state.calories,
        formProt: location.state.protein,
        formCarbs: location.state.carbs,
        formFat: location.state.fat,
        formFiber: location.state.fiber 
      });
    }
  }, []);
  

  const [addFood, results] = useAddFoodMutation();

  const changeHandler = (e: any) => {
    setFields({...fields, [e.target.id]: e.target.value});
  }

  const handleAddFood = (e: any) => {
    e.preventDefault();    
    addFood(fields);
  }

  return(
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" placeholder={fields.formName}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={changeHandler} type="text" placeholder={fields.formDescription}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formCals">
            <Form.Label>Calories</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields.formCals.toString()}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formProt">
            <Form.Label>Protein</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields.formProt.toString()}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formCarbs">
            <Form.Label>Carbs</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields.formCarbs.toString()}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFat">
            <Form.Label>Fat</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields.formFat.toString()}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFiber">
            <Form.Label>Fiber</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields.formFiber.toString()}/>
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={handleAddFood} variant="primary" type="submit">Add Food</Button>
    </Form>
    
  )
}