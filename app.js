// Require the express framework
const express = require('express');
const path = require('path');

// Create an instance of express in a variable called "app"
let app = express();

// database setup
require("./models/db");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve up static files
app.use(express.static(path.join(__dirname, 'public')));

// Require the controllers
const main = require('./controllers/main');

/* App pages */
app.get('/', main.home);
app.get('/view/:id', main.detail);

// Used for loading data into our database
app.get('/load', main.load);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('system-error');
});

module.exports = app;
