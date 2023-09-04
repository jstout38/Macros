"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keys = require('./config/keys');
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport = require('passport');
require('./models/User');
require('./services/passport');
//Connect to MongoDB database
mongoose_1.default.connect(keys.MongoURI);
//Create express object for route handling
const app = (0, express_1.default)();
//Use cookieSession and passport middleware to generate 30-day cookies upon login
app.use((0, cookie_session_1.default)({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));
app.use(passport.initialize());
app.use(passport.session());
//Import authentication routes
require('./routes/authRoutes')(app);
//Start server on port 5000
app.listen(5000, () => {
    console.log("Server is up and running");
});
