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
          breakfast: [],
          lunch: [],
          dinner: [],
          snacks: [],
          user: user_record._id,
        }).save();
        user_record.journal.push(entry);
        user_record.save();
      }
    }
    
  });

  app.put('/journal/update', async (req, res) => {
    const currentUser = req.user as IUser;
    const entry = await new Journal({ 
      date: req.body.formDate,
      breakfast: req.body.breakfast,
      lunch: req.body.lunch,
      dinner: req.body.dinner,
      snacks: req.body.snacks,
    }).save();
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId});
    }
    user_record.journal.push(entry);
    user_record.save();
  });


  app.get('/journal/entries', async (req, res) => {
    const currentUser = req.user as IUser;
    var user_record;
    if (currentUser) {
      user_record = await User.findOne({ googleId: currentUser.googleId })
      .populate('journal')
      .exec();
    }
    if (user_record) {
      res.send(user_record.journal);
    };
  });

};