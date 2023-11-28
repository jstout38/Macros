import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useAddUserMutation } from '../store';
import { FormData, FormUpdate } from '../store/apis/authApi';
import { useFetchUserQuery } from '../store';

type RegisterProps = {
  closeModal: Function,
}

//Component for registration and updating account

export default function Register(props: RegisterProps) {  

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
    formDOB: null
    });

  //Fetch existing user data
  const { data, error, isLoading } = useFetchUserQuery();
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
  const [addUser, results] = useAddUserMutation();
  
  //Initialize a state variable for showing a date as string when data is first loaded
  const [inputType, setInputType] = useState("text");

  //Update fields based on user input
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({...fields, [e.target.id]: e.target.value});
  }

  //Update the user and close modal on clicking submit button
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();    
    addUser({fields, googleId});
    props.closeModal();
  }

  return(
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" value={fields.formFirstName}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" value={fields.formLastName}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control onChange={changeHandler} type="email" value={fields.formEmail}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formWeight">
            <Form.Label>Current Weight (in pounds)</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formWeight}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formHeight">
            <Form.Label>Current Height (in inches)</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formHeight}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control onChange={changeHandler} type={inputType} placeholder={fields.formDOB ? moment(fields?.formDOB).utc().format('MM/DD/YYYY') : ''} onFocus={() => setInputType("date")}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formProtein">
            <Form.Label>Target Protein</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formProtein}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formCarbs">
            <Form.Label>Target Carbs</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formCarbs}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFat">
            <Form.Label>Target Fat</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formFat}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFiber">
            <Form.Label>Target Fiber</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formFiber}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formCalories">
            <Form.Label>Target Calories</Form.Label>
            <Form.Control onChange={changeHandler} type="number" value={fields.formCalories}/>
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={handleRegister} variant="primary" type="submit">Update</Button>
    </Form>
    
  )
}