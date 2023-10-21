import { Schema, model }from 'mongoose';

export interface IFood {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  external_link: string;
}

//Create mongoose model for Users
const foodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  description: { type: String },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, required: true },
  external_link: { type: String }
});

//Create model on require 
module.exports = model<IFood>('users', foodSchema);