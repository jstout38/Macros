//Endpoints for authentication processes via passport
import { Express } from 'express';
import mongoose from 'mongoose';
import { IUser } from '../models/User';
import { ObjectId } from 'mongodb';

const Food = mongoose.model("foods");
const User = mongoose.model("users");
const Journal = mongoose.model("journal");
const Entry = mongoose.model("entry");

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
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
          user: user_record._id,
        }).save();
        user_record.journal.push(entry);
        user_record.save().then((user: IUser) => {
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
    var existing = await Entry.findOne( { user: user_record._id, date: req.body.input.date, food: req.body.input.food, meal: req.body.input.meal} )      
    if (existing) {
      existing.quantity = req.body.input.quantity;
      existing.save();
      res.send(existing);
    } else {
      var newEntry = await new Entry({ food: req.body.input.food, quantity: req.body.input.quantity, date: req.body.input.date, meal: req.body.input.meal, user: user_record._id });
      newEntry.save();
      var currentJournal = await Journal.findOne( {user: user_record._id, date: req.body.input.date });
      currentJournal[req.body.input.meal].push(newEntry._id);
      currentJournal.save();
      res.send(currentJournal);      
    }
  });

  app.delete('/journal/delete', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId });
    }
    await Entry.findOneAndDelete( {_id: req.query.id });    
    res.status(200).send("Delete successful!");
  });


  app.get('/journal/entries', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId });      
    }
    var entries = await Journal.findOne({ user: user_record._id, date: req.query.date})
    .populate({
      path: "breakfast",
      populate: { path: "food" }
    })
    .populate({
      path: "lunch",
      populate: { path: "food" }
    })
    .populate({
      path: "dinner",
      populate: { path: "food" }
    })
    .populate({
      path: "snacks",
      populate: { path: "food" }
    })
    .exec();
    res.send(entries);
  });

};