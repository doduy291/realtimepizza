const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const mongoose = require('mongoose');
const mongoDBStore = require('connect-mongo')(session);
const flash = require('express-flash');
// const morgan = require('morgan');

// Use ExpressJS
const app = express();

// Gzip in NodeJS
app.use(compression());

// Require Router
const homeRouter = require('./routes/home.Router');
const authRouter = require('./routes/auth.Router');
const cartRouter = require('./routes/cart.Router');

// Replace Body-parse for Expressjs 4.16+
// Parse JSON bodies
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Session Mongoose Connection Store
const MongoStore = new mongoDBStore({
  mongooseConnection: mongoose.connection,
  collection: 'session',
});

// Session secret
app.use(
  session({
    secret: 'bestsecretsession',
    store: MongoStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 24h
  })
);

//Flash message
app.use(flash());

// Views EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Use Router
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);

// Database Connection
const url = 'mongodb://localhost:27017/pizza';
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((err) => {
    console.log('Failed Connection', err);
  });

// Run server host
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// module.exports = app; // Testing (AFTER)
