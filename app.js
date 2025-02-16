const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser'); // Add cookie-parser
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
app.use(cookieParser()); // Use cookie-parser

app.use('/', home_page);
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/Billing', Billing);
app.use('/pleged', pleged);
app.use('/profile', profile);
app.use('/logout', logoutRoutes);



app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3000');
});