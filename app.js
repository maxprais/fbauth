'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var port = process.env.PORT || 8000;

var sendgrid = require("sendgrid")("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");
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.set('views', 'public/views/');
app.set('view engine', 'jade');


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.use(cookieParser());
app.use(passport.initialize());

app.get('/login', function (req, res) {
    res.render('index');
    //res.sendFile(__dirname + 'public/views/index.html');
});

app.get('/', function (req, res) {
    if (name) {
        sendEmail();
    }

    res.render('home', {name: name});
    //res.sendFile(__dirname + 'public/views/home.html');
});


var name;
var userDetails;
passport.use(new FacebookStrategy({
        clientID: '572142882949200',
        clientSecret: 'c517fe05925ff09486c7c62f85d64829',
        callbackURL: "http://localhost:8000/auth/facebook/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile['displayName']);
        userDetails = JSON.stringify(profile);
        name = profile['displayName'];
        done(null, profile);
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/redirect',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }
    ));


passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});


function sendEmail() {
    var email     = new sendgrid.Email({
        to:       'boaz@askrround.com',
        from:     'maxprais@gmail.com',
        subject:  'Max Prais - Email',
        text:     'Hey Boaz I managed to send an email, here are the user details: ' + userDetails
    });
    sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });

}

module.exports = app;

app.listen(port);
console.log('Working on port: ' +  port);






