"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
module.exports = (app) => {
    //endpoint for using Google authentication via passport
    app.get('/auth/google', passport_1.default.authenticate('google', {
        scope: ['profile', 'email']
    }));
    //endpoint for callback after Google authentication
    app.get('/auth/google/callback', passport_1.default.authenticate('google'));
    //endpoint for logging out
    app.get('/api/logout', (req, res, next) => {
        req.logout(function (err) {
            if (err) {
                return next(err);
            }
            res.redirect('/');
        });
        res.send(req.user);
    });
    //endpoint to show current user for testing
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};
