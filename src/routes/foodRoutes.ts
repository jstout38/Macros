//Endpoints for authentication processes via passport
import { Express } from 'express';
const foodAPI = require('../services/foodAPI');
import mongoose from 'mongoose';
import { IUser } from '../models/User';

const Food = mongoose.model("foods");
const User = mongoose.model("users");

type SearchResponse = {
  hints: [],
  parsed: [],
  text: string,
  _links: {},
}

module.exports = (app: Express) => {
  //endpoint for calling the external food search API
  app.get('/food/search', (req, res) => {
   foodAPI(req.query.keyword)
    .then((response: SearchResponse) => {
      res.send(response);
    });    
  }
  );

  //endpoint for adding a new food
  app.put('/food/add', async (req, res) => {
    const currentUser = req.user as IUser;
    const food = await new Food({ 
      name: req.body.formName,
      description: req.body.formDescription,
      calories: req.body.formCals,
      protein: req.body.formProt,
      carbs: req.body.formCarbs,
      fat: req.body.formFat,
      fiber: req.body.formFiber,
    }).save();
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId});
    }
    user_record.foods.push(food);
    user_record.save();
    res.send(user_record);

  });

  //endpoint for updating a food's information
  app.post('/food/update', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId });
    }
    var currentFood = await Food.findOneAndUpdate({ _id: req.body.input.id }, {
      name: req.body.input.formName,
      description: req.body.input.formDescription,
      calories: req.body.input.formCals,
      protein: req.body.input.formProt,
      carbs: req.body.input.formCarbs,
      fat: req.body.input.formFat,
      fiber: req.body.input.formFiber,
    });
    currentFood.save();
    res.send(currentFood);
  })

  //endpoint for getting all of a user's foods
  app.get('/food/foodlist', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record = null;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId })
      .populate('foods')
      .exec();
    }
    res.send(user_record.foods);
  });

  //endoint for deleting a food
  app.delete('/food/delete', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId });
    }
    user_record.foods.pull(req.query.food_id);
    user_record.save()
    res.send(user_record);
  });
};