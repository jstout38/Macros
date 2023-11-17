//Endpoints for authentication processes via passport
import { Express } from 'express';
import mongoose from 'mongoose';
import { IUser } from '../models/User';

const Food = mongoose.model("foods");
const User = mongoose.model("users");
const Journal = mongoose.model("journal");

module.exports = (app: Express) => {
  app.post('/journal/add', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId});
      const existingEntry = await Journal.findOne({ user: user_record._id, date: req.body.date });
      if (!existingEntry) {
        const entry = await new Journal({ 
          date: req.body.date,
          foods: {
            breakfast: [],
            lunch: [],
            dinner: [],
            snacks: [],
          },
          user: user_record._id,
        }).save();
        user_record.journal.push(entry);
        user_record.save().then((user: any) => {
          res.send(user);
        });
      } else {
        res.send(existingEntry);
      }
     
    }
    
  });

  app.put('/journal/update', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId});
    }
    var currentJournal = await Journal.findOne( { user: user_record._id, date: req.body.input.date} );
    if (currentJournal) {
      var newFoodList = currentJournal.foods;
      newFoodList[req.body.input.meal].push(req.body.input.food);
      currentJournal = await Journal.findOneAndUpdate( { user: user_record._id, date: req.body.input.date}, { foods: newFoodList })
      currentJournal.save();
      res.send(currentJournal);
    } else {
      res.status(404);
    }
  });

  app.delete('/journal/delete', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId });
    }
    var currentJournal: any = await Journal.findOne( { user: user_record._id, date: req.query.date} );
    if (req.query.meal) {
      currentJournal.foods[req.query.meal.toString()].pull(req.query.food);
      currentJournal.save();
    }    
    res.send(currentJournal);
  });


  app.get('/journal/entries', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId });      
    }
    var entries = await Journal.findOne({ user: user_record._id, date: req.query.date})
    .populate({
      path: "foods",
      populate: { path: "breakfast" }
    })
    .populate({
      path: "foods",
      populate: { path: "lunch" }
    })
    .populate({
      path: "foods",
      populate: { path: "dinner" }
    })
    .populate({
      path: "foods",
      populate: { path: "snacks" }
    })
    .exec();
    res.send(entries);
  });

};