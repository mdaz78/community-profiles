import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './server/config';

var session = require('express-session');
var passport = require('passport');
var RedisStore = require('connect-redis')(session);
var redisClient = require('redis').createClient({ host: 'localhost', port: 6379 });

var auth = require('./server/routes/auth.routes')();
var users = require('./server/routes/users.routes');
var sprints = require('./server/routes/sprints.routes');
var admin = require('./server/routes/admin.routes');
var ventures = require('./server/routes/ventures.routes');
var skills = require('./server/routes/skills.routes');
var User = require('./server/models/user');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.resolve(__dirname, 'dist')));


if(process.env.NODE_ENV === 'development') {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

mongoose.Promise = global.Promise;

mongoose.connect(config.database, function(err, con) {
  // body...
  console.log(err, con);
});

require('./server/modules/passport')(passport);

app.use(session({
  store: new RedisStore({ client: redisClient, ttl: 3600 * 60 }),
  secret: 'jaaga',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/api/users', users);
app.use('/api/admin', admin);
app.use('/api/ventures', ventures);
app.use('/api/skills', skills);
app.use('/api/sprints', sprints);

app.use((req, res) => {

  var jsPath = '/static/bundle.js';

  if (process.env.NODE_ENV == 'production') {
    jsPath = '/dist/bundle/bundle.js'
  }

  // protect all routes.
  if (req.originalUrl !== '/' && !req.user) {
    return res.redirect('/');
  }

  if (req.user) {
    User.findById(req.user._id).select('-password').exec(function(err, user) {
      res.render('index', { initialState: { currentUser: user }, jsPath: jsPath } );
    });
  } else {
    res.render('index', { initialState: { currentUser: null }, jsPath: jsPath } );
  }

});

// app.use('/', routes);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {} });
});


module.exports = app;
