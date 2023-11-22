import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useFetchFoodQuery } from '../store';
import SearchResult from './SearchResult';
import "../css/styles.css";

export default function SearchForm(props: any) {  

  const [keyword, setKeyword] = useState<string>('');

  const { data, error, isLoading } = useFetchFoodQuery(keyword); 
  
  const changeHandler = (e: any) => {
    setKeyword(e.target.value);
  }
  
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(data);
  }

  const autoComplete = (searchData: any) => {
    
    if (isLoading || searchData.text === "") {
      return;
    } else {
      
      return (
        <ul className="searchContainer">
          {searchData.hints.slice(0, 5).map((food: any, index: any) => {        
            var foodImage;
            if (!food.food.image) {
              foodImage = <img className="searchImage" src={require('../images/m.png')} />;
            } else {
              foodImage = <img 
                className="searchImage"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src=require('../images/m.png');
                }} 
                src={food.food.image} />;
            }   
            var calories = parseFloat(food.food.nutrients.ENERC_KCAL).toFixed(0);
            var fat = parseFloat(food.food.nutrients.FAT).toFixed(2);
            var protein = parseFloat(food.food.nutrients.PROCNT).toFixed(2);
            var carbs = parseFloat(food.food.nutrients.CHOCDF).toFixed(2);
            var fiber = parseFloat(food.food.nutrients.FIBTG).toFixed(2);  
            return (
            //<Link key={index} to={ `/addFood`} state={{
            //  name: food.food.label,
            //   calories: calories,
            //   fat: fat,
            //   protein: protein,
            //   carbs: carbs,
            //   fiber: fiber
            // }}>
            <SearchResult key={index} selectFood={props.selectFood} label={food.food.label} foodImage={foodImage} calories={calories} fat={fat} protein={protein} carbs={carbs} fiber={fiber}/>
            //</Link> 
            )
          })}
      </ul>
      );
    }
  }

  return(
    <Form onSubmit={handleSubmit}>
      <Row className="align-items-center">                  
          <Col>
            <Form.Group className="searchBox" controlId="keyword">
              <Form.Label>Search</Form.Label>
              <Form.Control onChange={changeHandler} type="text"/>
            </Form.Group>
            {autoComplete(data)}
          </Col>
      </Row>
      
      
    </Form>
    
  )
}