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
var port = process.env.PORT || 8000;
app.use(express.static('public'));
var sendgrid = require("sendgrid")("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");

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
});



app.get('/', function (req, res) {

    app.post('/getname', function (req, res) {
        name = res.json('username');
        console.log(name);
    });
     var name;
    console.log(name);
    res.render('home', {username: name});
});



app.post('/email', function (req, res) {
    console.log('email');
    res.send('success');
    sendEmail();
});

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/redirect',
    passport.authenticate('facebook', { successRedirect: '/',
        failureRedirect: '/login' }
    ));


var name;
var userDetails;
passport.use(new FacebookStrategy({
        clientID: '572142882949200',
        clientSecret: 'c517fe05925ff09486c7c62f85d64829',
        callbackURL: "http://localhost:8000/auth/facebook/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        //console.log(profile['displayName']);
        sendName(profile['displayName']);

        //userDetails = JSON.stringify(profile);
        //name = profile['displayName'];
        done(null, profile);
    }
));

function sendName(name) {
    app.get('/name', function (req, res) {
        //console.log(name);
        res.send(name);

    })
}

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});




function sendEmail() {
    var email     = new sendgrid.Email({
        to:       'maxprais@gmail.com',
        from:     'maxprais@gmail.com',
        subject:  'Max Prais - Email',
        text:     'Hey Boaz I managed to send an email, here are the user details: ' + userDetails
    });
    sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });

}


app.listen(port);
console.log('Working on port: ' +  port);



