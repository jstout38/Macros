//Endpoints for authentication processes via passport
import { Express } from 'express';
const foodAPI = require('../services/foodAPI');

module.exports = (app: Express) => {
  //endpoint for using Google authentication via passport
  app.get('/food/search', (req, res) => {
   foodAPI(req.query.keyword)
    .then((response: any) => {
      res.send(response);
    });    
  }
  );


};