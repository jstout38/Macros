import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { FoodForm } from '../store/apis/foodApi';
import { useAddFoodMutation, useEditFoodMutation } from '../store';

//Define type for component props
type AddFoodProps = {
  name: string,
  description: string,
  calories: number,
  protein: number,
  carbs: number,
  fat: number,
  fiber: number,
  edit: string | null,
  submit: Function
}

interface ValidateFormType extends HTMLFormElement {
  checkValidity: () => boolean,
}

//Component for adding a food, is used in a modal pulled up from the FoodPanel compoenent. Is also used to add
//a food found via the search by passing props from search compoent to the AddFood panel, and is also used to
//edit existing foods when passed the edit prop (id of Food object to edit)
export default function AddFood(props: AddFoodProps) {
  
  const [validated, setValidated] = useState(false);

  //Form control for input
  const [fields, setFields] = useState<FoodForm>({
    formName: '',
    formDescription: '',
    formCals: 0,
    formProt: 0,
    formCarbs: 0,
    formFat: 0,
    formFiber: 0,
  });

  //RTK Query mutations, addFood adds a new food to the mongoDB database, and editFood updates an existing record
  const [addFood] = useAddFoodMutation();
  const [editFood] = useEditFoodMutation();

  //If props are passed to the component from search or edit, fill the form fields 
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

  //Update form state on changes
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({...fields, [e.target.id]: e.target.value});
  }

  //Prevent default form behvior, instead use current state to add or edit, depending on whether the edit prop is set
  const handleAddFood = (e: React.FormEvent<ValidateFormType>) => {
    e.preventDefault();    
    const form = e.currentTarget;
    if (form.checkValidity()) {
      if (props.edit) {
        var input = {
          formName: fields.formName,
          formDescription: fields.formDescription,
          formCals: fields.formCals,
          formProt: fields.formProt,
          formCarbs: fields.formCarbs,
          formFat: fields.formFat,
          formFiber: fields.formFiber,
          id: props.edit,
        }
        editFood(input);
      } else {
        addFood(fields);
      }
      //Close the modal
      if (props.submit) {
        props.submit();
      }
    }

    setValidated(true);

  }

  //React Bootstrap form control component
  return(    
    <Form noValidate validated={validated} onSubmit={handleAddFood}>
      <Row className="align-items-center">
        <Col xs="12">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control required onChange={changeHandler} type="text" value={fields.formName}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>          
        </Col>
        <Col xs="12">
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control onChange={changeHandler} type="text" as="textarea" value={fields.formDescription}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="6">
          <Form.Group className="mb-3" controlId="formCals">
            <Form.Label>Calories</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formCals}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="6">
          <Form.Group className="mb-3" controlId="formProt">
            <Form.Label>Protein</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formProt}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>      
      <Row>        
        <Col xs="6">
          <Form.Group className="mb-3" controlId="formCarbs">
            <Form.Label>Carbs</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formCarbs}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="6">
          <Form.Group className="mb-3" controlId="formFat">
            <Form.Label>Fat</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formFat}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs="6">
          <Form.Group className="mb-3" controlId="formFiber">
            <Form.Label>Fiber</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formFiber}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Button className="w-25 m-2" variant="primary" type="submit">Save</Button>
      </Row>
    </Form>
    
  )
}