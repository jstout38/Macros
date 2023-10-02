import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import { useAddUserMutation } from '../store';
import { FormData } from '../store/apis/authApi';

export default function Register() {
  const [fields, setFields] = useState<FormData>({
    formFirstName: '',
    formLastName: '',
    formEmail: '',
    formWeight: '',
    formHeight: '',
    formDOB: ''
  });
  const [addUser, results] = useAddUserMutation();

  const changeHandler = (e: any) => {
    setFields({...fields, [e.target.id]: e.target.value});
    console.log(e);
  }
  const handleRegister = () => {
    addUser(fields);
  }
  return(
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control onChange={changeHandler} type="email" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formWeight">
            <Form.Label>Current Weight (in pounds)</Form.Label>
            <Form.Control onChange={changeHandler} type="number" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formHeight">
            <Form.Label>Current Height (in inches)</Form.Label>
            <Form.Control onChange={changeHandler} type="number" />
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control onChange={changeHandler} type="date" />
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={handleRegister} variant="primary" type="submit">Register</Button>
      {fields.formFirstName}
    </Form>
    
  )
}