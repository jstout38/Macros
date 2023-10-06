import { Schema, model }from 'mongoose';

export interface IUser {
  googleId: string;
  firstName: string;
  lastName: string;
  email: string;
  DoB: Date;
  weight: number;
  height: number;
}

//Create mongoose model for Users
const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  DoB: { type: Date, required: false },
  weight: { type: Number, required: false },
  height: { type: Number, required: false }
});

//Create model on require 
module.exports = model<IUser>('users', userSchema);