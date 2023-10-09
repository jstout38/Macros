import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useFetchFoodQuery } from '../store';

export default function Search() {  

  const [keyword, setKeyword] = useState<string>('');

  const { data, error, isLoading } = useFetchFoodQuery(keyword); 
  
  const changeHandler = (e: any) => {
    setKeyword(e.target.value);
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  }

  return(
    <Form>
      <Row className="align-items-center">        
          <Form.Group className="mb-3" controlId="keyword">
            <Form.Label>Search</Form.Label>
            <Form.Control onChange={changeHandler} type="text"/>
          </Form.Group>        
      </Row>
      <Button onClick={handleSubmit} variant="primary" type="submit">Register</Button>
    </Form>
    
  )
}