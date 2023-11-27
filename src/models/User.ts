import { Schema, model } from 'mongoose';
import { IFood, foodSchema } from './Food';

//Interface for json for creating user

export interface IUser {
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  DoB: Date;
  weight: number;
  height: number;
  protein: number;
  carbs: number;
  calories: number;
  fat: number;
  fiber: number;
  foods: [Schema];
  journal: [Schema];
}

//Create mongoose model for Users
const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  DoB: { type: Date, required: false },
  weight: { type: Number, required: false },
  height: { type: Number, required: false },
  protein: { type: Number, required: false },
  carbs: { type: Number, required: false },
  calories: { type: Number, required: false },
  fat: { type: Number, required: false },
  fiber: { type: Number, required: false },
  foods: {type: [Schema.Types.ObjectId], ref: "foods"},
  journal: {type: [Schema.Types.ObjectId], ref: 'journal'},
});

//Create model on require 
module.exports = model<IUser>('users', userSchema);