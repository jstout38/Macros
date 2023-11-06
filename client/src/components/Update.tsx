import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useAddUserMutation } from '../store';
import { FormData, FormUpdate } from '../store/apis/authApi';
import { useFetchUserQuery } from '../store';

export default function Register() {
  

  const [fields, setFields] = useState<FormData>({
    formFirstName: '',
    formLastName: '',
    formEmail: '',
    formWeight: 0,
    formHeight: 0,
    formDOB: null
    });

  const { data, error, isLoading } = useFetchUserQuery();

  useEffect(() => {
    if (data) {
      setFields({
      formFirstName: data.firstName,
      formLastName: data.lastName,
      formEmail: data.email,
      formWeight: data.weight,
      formHeight: data.height,
      formDOB: data.DoB
      })
    }}, [data]);
  

  const [addUser, results] = useAddUserMutation();
  const [inputType, setInputType] = useState("text");

  const changeHandler = (e: any) => {
    setFields({...fields, [e.target.id]: e.target.value});
  }
  const handleRegister = (e: any) => {
    e.preventDefault();    
    addUser({fields, data});
  }
  return(
    <Form>
      <Row className="align-items-center">
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" placeholder={fields.formFirstName}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={changeHandler} type="text" placeholder={fields.formLastName}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control onChange={changeHandler} type="email" placeholder={fields.formEmail}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formWeight">
            <Form.Label>Current Weight (in pounds)</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields?.formWeight.toString()}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formHeight">
            <Form.Label>Current Height (in inches)</Form.Label>
            <Form.Control onChange={changeHandler} type="number" placeholder={fields?.formHeight.toString()}/>
          </Form.Group>
        </Col>
        <Col xs="auto">
          <Form.Group className="mb-3" controlId="formDOB">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control onChange={changeHandler} type={inputType} placeholder={moment(fields?.formDOB).utc().format('MM/DD/YYYY')} onFocus={() => setInputType("date")}/>
          </Form.Group>
        </Col>
      </Row>
      <Button onClick={handleRegister} variant="primary" type="submit">Register</Button>
    </Form>
    
  )
}