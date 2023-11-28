import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import { useFetchFoodQuery } from '../store';
import SearchResult from './SearchResult';

type SearchProps = {
  selectFood: Function,
}

//Component that houses the search form for Food API
//The food API I am using is not ideal but it's free. I use the hints supplied by the response to create
//elements that can be clicked on. Clicking on a result pulls up the add food modal and sends the info from
//search via props
export default function SearchForm(props: SearchProps) {  

  //Initialize keyword state for form control to empty string
  const [keyword, setKeyword] = useState<string>('');

  //RTK Query for the food API
  const { data, error, isLoading } = useFetchFoodQuery(keyword); 
  
  //Form control
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }
  
  //Prevent submitting the form - instead we create clickable autocomplete
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  type SearchResponse = {
    hints: [FoodElement],
    parsed: [],
    text: string,
    _links: {},
  }

  type FoodElement = {
    food: {
      category: string,
      categoryLabel: string,
      foodId: string,
      image: string,
      knownAs: string,
      label: string,
      nutrients: {
        ENERC_KCAL: number,
        FAT: number,
        PROCNT: number,
        CHOCDF: number,
        FIBTG: number,
      },
    },
    measures: [],
  }

  //Main logic for searching - pulls the first five autocomplete results and turns them into clickable SearchResult
  //components
  const autoComplete = (searchData: SearchResponse) => {
    if (isLoading || !searchData.text) {
      return;
    } else {      
      return (
        <ul className="searchContainer">
          {searchData.hints.slice(0, 5).map((food: FoodElement, index: number) => {        
            console.log(food);
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
            var calories = food.food.nutrients.ENERC_KCAL.toFixed(0);
            var fat = food.food.nutrients.FAT.toFixed(2);
            var protein = food.food.nutrients.PROCNT.toFixed(2);
            var carbs = food.food.nutrients.CHOCDF.toFixed(2);
            var fiber = food.food.nutrients.FIBTG.toFixed(2);  
            return (            
            <SearchResult key={index} selectFood={props.selectFood} label={food.food.label} foodImage={foodImage} calories={calories} fat={fat} protein={protein} carbs={carbs} fiber={fiber}/>            
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