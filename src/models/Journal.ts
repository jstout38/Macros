import { Schema, model } from 'mongoose';
import { IFood, foodSchema } from './Food';

export interface IJournal {
  user: Schema;
  date: string;
  breakfast: [Schema],
  lunch: [Schema],
  dinner: [Schema],
  snacks: [Schema],  
}

export interface Entry {
  food: Schema,
  quantity: number,
  date: string,
  meal: string,
  user: Schema,
}

const entrySchema = new Schema<Entry>({
  food: {type: Schema.Types.ObjectId, ref: "foods"},
  quantity: {type: Number, required: true },
  date: String,
  meal: String,
  user: {type: Schema.Types.ObjectId, ref: "users"}
});

//Create mongoose model for Users
const journalSchema = new Schema<IJournal>({
  user: {type: Schema.Types.ObjectId, ref: "users"},
  date: { type: String, required: true },  
  breakfast: {type: [Schema.Types.ObjectId], ref: "entry"},
  lunch: {type: [Schema.Types.ObjectId], ref: "entry"},
  dinner: {type: [Schema.Types.ObjectId], ref: "entry"},
  snacks: {type: [Schema.Types.ObjectId], ref: "entry"},
});

//Create model on require 
module.exports = {
  Journal: model<IJournal>('journal', journalSchema),
  Entry: model<Entry>('entry', entrySchema),
};