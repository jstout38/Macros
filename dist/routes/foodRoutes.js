"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const foodAPI_1 = __importDefault(require("../services/foodAPI"));
module.exports = (app) => {
    //endpoint for using Google authentication via passport
    app.get('/food/search', (req, res) => {
        console.log(req.query.keyword);
        (0, foodAPI_1.default)(req.query.keyword);
    });
};
