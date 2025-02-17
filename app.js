const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

connectDB();

const home_page = require('./routes/home_page');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const Billing = require('./routes/Billing');
const pleged = require('./routes/pleged');
const profile = require('./routes/profile');
const logoutRoutes = require('./routes/logout');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Configure express-session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize connect-flash
app.use(flash());

// Middleware to pass flash messages to EJS templates
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

app.use('/', home_page);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/Billing', Billing);
app.use('/pleged', pleged);
app.use('/profile', profile);
app.use('/logout', logoutRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
