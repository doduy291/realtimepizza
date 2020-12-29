const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

// Require Router
const homeRouter = require('./routes/home.Router');
const authRouter = require('./routes/auth.Router');
const cartRouter = require('./routes/cart.Router');

app.use(express.json());

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

// Run server host
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
