import { Schema, model }from 'mongoose';
import { IFood, foodSchema } from './Food';

export interface IUser {
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  DoB: Date;
  weight: number;
  height: number;
  foods: IFood[];
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
  foods: [new Schema<IFood>],
});

//Create model on require 
module.exports = model<IUser>('users', userSchema);