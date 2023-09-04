"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose_1 = __importDefault(require("mongoose"));
const keys = require("../config/keys");
// Get user class from mongoose
const User = mongoose_1.default.model('users');
// Serialize user and get its MongoDB id
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
// Retrieve user from MongoDB id
passport_1.default.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
        done(null, user);
    });
});
//Google authentication logic using passport Google strategy
passport_1.default.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    //Check if there is existing user
    const existingUser = yield User.findOne({ googleId: profile.id });
    //If user exists return existing user, else create new user in mongoose/MongoDB
    if (existingUser) {
        done(null, existingUser);
    }
    else {
        const user = yield new User({ googleId: profile.id }).save();
        done(null, user);
    }
    ;
})));
