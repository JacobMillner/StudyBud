var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
var mongoose = require('mongoose');

//first check if env vars are set
//TODO - add the check
//JWT_SECRET
//MONGOLAB_URI

mongoose.connect(process.env.MONGOLAB_URI, { useNewUrlParser: true });

//on connect
mongoose.connection.on('connected', () => {
  console.log('Connection to our mongodb successful.' );
});

//on error connecting
mongoose.connection.on('error', (err) => {
  console.log('Error connecting to mongodb '+ process.env.MONGOLAB_URI +':' + err);
});

var app = express();

// cross server request middleware
app.use(cors());

// body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var port = process.env.PORT || 6969;

app.listen(port, function () {
  console.log('Study-bud listening to port: ' + port + '!');
});

module.exports = app;