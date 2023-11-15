import { Schema, model } from 'mongoose';
import { IFood, foodSchema } from './Food';

export interface IJournal {
  user: Schema;
  date: string;
  foods: {
    breakfast: [Schema],
    lunch: [Schema],
    dinner: [Schema],
    snacks: [Schema],  
  }
}

//Create mongoose model for Users
const journalSchema = new Schema<IJournal>({
  user: {type: Schema.Types.ObjectId, ref: "users"},
  date: { type: String, required: true },  
  foods: { 
    breakfast: {type: [Schema.Types.ObjectId], ref: "foods"},
    lunch: {type: [Schema.Types.ObjectId], ref: "foods"},
    dinner: {type: [Schema.Types.ObjectId], ref: "foods"},
    snacks: {type: [Schema.Types.ObjectId], ref: "foods"},
  }
});

//Create model on require 
module.exports = model<IJournal>('journal', journalSchema);