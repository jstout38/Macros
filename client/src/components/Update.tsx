import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useAddUserMutation } from '../store';
import { FormData } from '../store/apis/authApi';
import { useFetchUserQuery } from '../store';

type RegisterProps = {
  closeModal: Function,
}

interface ValidateFormType extends HTMLFormElement {
  checkValidity: () => boolean,
}


//Component for registration and updating account

export default function Register(props: RegisterProps) {  

  const [validated, setValidated] = useState(false);

  //Initialize form control state
  const [fields, setFields] = useState<FormData>({
    formFirstName: '',
    formLastName: '',
    formEmail: '',
    formWeight: 0,
    formHeight: 0,
    formProtein: 0,
    formCarbs: 0,
    formFat: 0,
    formFiber: 0,
    formCalories: 0,
    formDOB: new Date()
    });

  //Fetch existing user data
  const { data } = useFetchUserQuery();
  const [ googleId, setGoogleId ] = useState('');

  //When user is fetch populate form with user's existing info
  useEffect(() => {
    if (data) {
      setFields({
      formFirstName: data.firstName,
      formLastName: data.lastName,
      formEmail: data.email,
      formWeight: data.weight,
      formHeight: data.height,
      formDOB: data.DoB,
      formProtein: data.protein,
      formCarbs: data.carbs,
      formFiber: data.fiber,
      formCalories: data.calories,
      formFat: data.fat,        
      });
      setGoogleId(data.googleId);
    }}, [data]);
  
  //RTK Query mutaiton for adding a new user
  const [addUser] = useAddUserMutation();
  
  //Update fields based on user input
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({...fields, [e.target.id]: e.target.value});
  }

  //Update the user and close modal on clicking submit button
  const handleRegister = (e: React.FormEvent<ValidateFormType>) => {
    e.preventDefault();    
    const form = e.currentTarget;
    if (form.checkValidity()) {
      addUser({fields, googleId});
      props.closeModal();
    }
    setValidated(true);
  }

  return(
    <Form noValidate validated={validated} onSubmit={handleRegister}>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control required onChange={changeHandler} type="text" value={fields.formFirstName}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required onChange={changeHandler} type="text" value={fields.formLastName}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control required onChange={changeHandler} type="email" value={fields.formEmail}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>      
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formProtein">
            <Form.Label>Target Protein</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formProtein}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formCarbs">
            <Form.Label>Target Carbs</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formCarbs}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formFat">
            <Form.Label>Target Fat</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formFat}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formFiber">
            <Form.Label>Target Fiber</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formFiber}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-3" controlId="formCalories">
            <Form.Label>Target Calories</Form.Label>
            <Form.Control required onChange={changeHandler} type="number" value={fields.formCalories}/>
            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Button className="w-25 m-2" variant="primary" type="submit">Update</Button>
      </Row>
    </Form>
    
  )
}