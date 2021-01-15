const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');
const compression = require('compression');
const mongoose = require('mongoose');
const mongoDBStore = require('connect-mongo')(session);
const flash = require('express-flash');
const passport = require('passport');
const Emitter = require('events');
// const morgan = require('morgan');

// Use ExpressJS
const app = express();

// Gzip in NodeJS
app.use(compression());

// Require Router
const homeRouter = require('./routes/home.Router');
const authRouter = require('./routes/auth.Router');
const cartRouter = require('./routes/cart.Router');
const adminRouter = require('./routes/admin.Router');

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

// Event emitter
const eventEmitter = new Emitter();
app.set('eventEmitter', eventEmitter);

// Session secret
app.use(
  session({
    secret: 'bestsecretsession',
    store: MongoStore,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 12 * 60 * 60 * 1000 }, // 12h
  })
);

// Passport Session
const passportMDW = require('./middleware/passport');
passportMDW.init(passport);
app.use(passport.initialize());
app.use(passport.session());

//Flash message
app.use(flash());

//Global Middleware get Session
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// Views EJS
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Use Router
// Client
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/cart', cartRouter);

// Admin
app.use('/admin', adminRouter);

// Database Connection
const url = 'mongodb://localhost:27017/pizza';
// const url = encodeURI('mongodb+srv://duydo:du7d0z9ibwt@cluster0.9ddzc.mongodb.net/pizza');
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
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Socket
const io = require('socket.io')(server);
io.on('connection', (socket) => {
  // Best argument name would be "roomName" instead of "orderId"
  // socket.on('join', (roomName) =>{
  socket.on('join', (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on('statusUpdated', (data) => {
  io.to(`order_${data.id}`).emit('statusUpdated', data);
});
eventEmitter.on('orderUpdated', (data) => {
  io.to('adminRoom').emit('orderUpdated', data);
});
