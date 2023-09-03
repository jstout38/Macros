import { Schema, model }from 'mongoose';

export interface IUser {
  googleId: string;
}

//Create mongoose model for Users
const userSchema = new Schema<IUser>({
  googleId: { type: String, required: true },
});

//Create model on require 
module.exports = model<IUser>('users', userSchema);