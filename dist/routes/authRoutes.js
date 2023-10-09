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
const mongoose_1 = __importDefault(require("mongoose"));
const User = mongoose_1.default.model('users');
module.exports = (app) => {
    //endpoint for using Google authentication via passport
    app.get('/auth/google', passport_1.default.authenticate('google', {
        scope: ['profile', 'email']
    }));
    //endpoint for callback after Google authentication
    app.get('/auth/google/callback', passport_1.default.authenticate('google'), (req, res) => {
        res.redirect('/search');
    });
    //endpoint for logging out
    app.get('/api/logout', (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
        res.redirect('/');
    });
    //endpoint to show current user for testing
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
    app.put('/auth/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(req.body);
        const user = yield User.findOneAndUpdate({ googleId: req.body.data.googleId }, {
            firstName: req.body.fields.formFirstName,
            lastName: req.body.fields.formLastName,
            email: req.body.fields.formEmail,
            weight: req.body.fields.formWeight,
            height: req.body.fields.formHeight,
            DoB: req.body.fields.formDOB
        });
    }));
};
