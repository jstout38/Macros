"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//Create mongoose model for Users
const userSchema = new mongoose_1.Schema({
    googleId: { type: String, required: true },
});
//Create model on require 
module.exports = (0, mongoose_1.model)('users', userSchema);
