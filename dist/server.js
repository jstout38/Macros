"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const keys = require('./config/keys');
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const passport_1 = __importDefault(require("passport"));
const body_parser_1 = __importDefault(require("body-parser"));
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
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(body_parser_1.default.json());
//Import authentication routes
require('./routes/authRoutes')(app);
require('./routes/foodRoutes')(app);
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}
//Start server on port 5000
app.listen(5000, () => {
    console.log("Server is up and running");
});
