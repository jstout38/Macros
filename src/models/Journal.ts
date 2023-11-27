import { Schema, model } from 'mongoose';
import { IFood, foodSchema } from './Food';

//Interface for json for journal

export interface IJournal {
  user: Schema;
  date: string;
  breakfast: [Schema],
  lunch: [Schema],
  dinner: [Schema],
  snacks: [Schema],  
}

//Interface for json for journal entry

export interface Entry {
  food: Schema,
  quantity: number,
  date: string,
  meal: string,
  user: Schema,
}

//Entries are individual entires and include a quantity. The larger journal schema includes all meals for a day

const entrySchema = new Schema<Entry>({
  food: {type: Schema.Types.ObjectId, ref: "foods"},
  quantity: {type: Number, required: true },
  date: String,
  meal: String,
  user: {type: Schema.Types.ObjectId, ref: "users"}
});

//Create mongoose model for Journal items
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