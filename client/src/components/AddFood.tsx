import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { FoodForm } from '../store/apis/foodApi';
import { useAddFoodMutation, useEditFoodMutation } from '../store';

export default function AddFood(props: any) {
  
  const [fields, setFields] = useState<FoodForm>({
    formName: '',
    formDescription: '',
    formCals: 0,
    formProt: 0,
    formCarbs: 0,
    formFat: 0,
    formFiber: 0,
  });

  const [addFood, results] = useAddFoodMutation();
  const [editFood, editResults] = useEditFoodMutation();

  useEffect(() => {
    setFields({
      formName: props.name ? props.name : '',
      formDescription: props.description ? props.description : '',
      formCals: props.calories ? props.calories : 0,
      formProt: props.protein ? props.protein : 0,
      formCarbs: props.carbs ? props.carbs : 0,
      formFat: props.fat ? props.fat : 0,
      formFiber: props.fiber ? props.fiber : 0,
    });
  }, [props]);

  const changeHandler = (e: any) => {
    setFields({...fields, [e.target.id]: e.target.value});
  }

  const handleAddFood = (e: any) => {
    e.preventDefault();    
    if (props.edit) {
      var input = {
        formName: fields.formName,
        formDescription: fields.formDescription,
        formCals: fields.formCals,
        formProt: fields.formProt,
        formCarbs: fields.formCarbs,
        formFat: fields.formCarbs,
        formFiber: fields.formFiber,
        id: props.edit,
      }
      editFood(input);
    } else {
      addFood(fields);
    }
    if (props.submit) {
      props.submit();
    }
  }

  return(
    
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" value={fields.formName}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={changeHandler} type="text" value={fields.formDescription}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formCals">
            <Form.Label>Calories</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formCals}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formProt">
            <Form.Label>Protein</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formProt}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formCarbs">
            <Form.Label>Carbs</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formCarbs}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFat">
            <Form.Label>Fat</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formFat}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFiber">
            <Form.Label>Fiber</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formFiber}/>
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={handleAddFood} variant="primary" type="submit">Save</Button>
    </Form>
    
  )
}