/**
 * Created by maxprais on 11/04/2016.
 */
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieParser = require('cookie-parser');

__dirname = '/Users/maxprais/Documents/dev/askaround/boaz/';

app.set('views', __dirname + 'views/');
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + 'public/'));

app.use(cookieParser());
app.use(passport.initialize());

app.get('/login', function (req, res) {
    res.render('index');
    //res.sendFile(__dirname + 'public/views/index.html');
});

app.get('/', function (req, res) {
    res.render('home', {name: name});
    //res.sendFile(__dirname + 'public/views/home.html');
});

var name;
passport.use(new FacebookStrategy({
        clientID: '572142882949200',
        clientSecret: 'c517fe05925ff09486c7c62f85d64829',
        callbackURL: "http://localhost:8000/auth/facebook/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile['displayName']);
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


app.listen(8000);



