import axios from 'axios';
const keys = require('../config/keys');

//External API call for searching for foods

module.exports = (keyword: string) => {
 return axios({
    method: 'get',
    url: 'https://api.edamam.com/api/food-database/v2/parser',
    params: {
      app_id: keys.nutritionClientID,
      app_key: keys.nutritionClientSecret,
      ingr: keyword
    }
  }).then(response => {
    return response.data;
  });
}