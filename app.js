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


var name;
app.get('/', function (req, res) {

    for (var i = 0; i < userList.length; i++){
        if (userList[i]['username'] === name){
            var username = name;
        }
    }

    console.log(username);
    res.render('home', {username: username});
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


function UserDetails (username, details){
    this.username = username;
    this.details = details;
}


passport.use(new FacebookStrategy({
        clientID: '572142882949200',
        clientSecret: 'c517fe05925ff09486c7c62f85d64829',
        callbackURL: "http://localhost:8000/auth/facebook/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        //console.log(profile['displayName']);
        saveName(profile['displayName'], profile);
        sendName(profile['displayName']);
        name = profile['displayName'];
        done(null, profile);
    }
));

var userList = [];

function saveName(name, profile){

    var new_user = new UserDetails(name, profile);
    userList.push(new_user);

}

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

    for (var i = 0; i < userList.length; i++){
        if (userList[i]['username'] === name){
            var details = userList[i]['details'];
        }
    }

    var email     = new sendgrid.Email({
        to:       'maxprais@gmail.com',
        from:     'maxprais@gmail.com',
        subject:  'Max Prais - Email',
        text:     'Hey Boaz I managed to send an email, here are the user details: ' + details
    });
    sendgrid.send(email, function(err, json) {
        if (err) { return console.error(err); }
        console.log(json);
    });

}


app.listen(port);
console.log('Working on port: ' +  port);



