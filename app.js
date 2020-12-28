const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.render('home');
});

// Views EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Run server host
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
