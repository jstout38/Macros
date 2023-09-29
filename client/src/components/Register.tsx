import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';

export default function Register() {
  const [fields, setFields] = useState({
    formFirstName: '',
    formLastName: '',
    formEmail: '',
    formWeight: '',
    formHeight: '',
    formDOB: ''
  });
  const changeHandler = (e: any) => {
    setFields({...fields, [e.target.id]: e.target.value});
    console.log(e);
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
      <Button variant="primary" type="submit">Register</Button>
      <div>
        {fields.formFirstName + ' ' + fields.formLastName}
      </div>
    </Form>
    
  )
}