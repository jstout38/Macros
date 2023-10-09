"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const keys = require('../config/keys');
function foodAPI(keyword) {
    (0, axios_1.default)({
        method: 'get',
        url: 'https://api.edamam.com/api/food-database/v2/parser',
        params: {
            app_id: keys.nutritionClientID,
            app_key: keys.nutritionClientSecret,
            ingr: keyword
        }
    })
        .then(function (response) {
        console.log(response);
    });
}
exports.default = foodAPI;
