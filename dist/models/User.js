"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//Create mongoose model for Users
const userSchema = new mongoose_1.Schema({
    googleId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    DoB: { type: Date, required: false },
    weight: { type: Number, required: false },
    height: { type: Number, required: false }
});
//Create model on require 
module.exports = (0, mongoose_1.model)('users', userSchema);
