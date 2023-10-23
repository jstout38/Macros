//Endpoints for authentication processes via passport
import { Express } from 'express';
const foodAPI = require('../services/foodAPI');
import mongoose from 'mongoose';

const Food = mongoose.model("foods");

module.exports = (app: Express) => {
  //endpoint for using Google authentication via passport
  app.get('/food/search', (req, res) => {
   foodAPI(req.query.keyword)
    .then((response: any) => {
      res.send(response);
    });    
  }
  );

  app.put('/food/add', async (req, res) => {
    const user = await new Food({ 
      name: req.body.formName,
      description: req.body.formDescription,
      calories: req.body.formCals,
      protein: req.body.formProt,
      carbs: req.body.formCarbs,
      fat: req.body.formFat,
      fiber: req.body.formFiber,
    }).save();
    res.send(user);
  });

};