import axios from 'axios';
const keys = require('../config/keys');

module.exports = (keyword: any) => {
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