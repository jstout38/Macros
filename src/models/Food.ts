import { Schema, model }from 'mongoose';

//Create Model and type for Food

export interface IFood {
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

//Create mongoose model for Users

export const foodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  description: { type: String },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  fiber: { type: Number, required: true },
});

//Create model on require 

module.exports = model<IFood>('foods', foodSchema);