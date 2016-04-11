/**
 * Created by maxprais on 11/04/2016.
 */
'use strict';

var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

__dirname = '/Users/maxprais/Documents/dev/askaround/boaz/';

// app.use(express.static(__dirname + '/public/views'));
// app.set('views', __dirname + '/public/views');
// console.log(__dirname);
// app.engine('html', require('jade').renderFile);
// app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + 'public/'));

app.get('/login', function (req, res) {
       res.sendFile(__dirname + 'public/views/index.html');
    });

passport.use(new FacebookStrategy({
        clientID: '572142882949200',
        clientSecret: 'c517fe05925ff09486c7c62f85d64829',
        callbackURL: "http://localhost:8000/auth/facebook/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(profile);
    }
));

app.get('/auth/facebook',
    passport.authenticate('facebook'));

app.get('/auth/facebook/redirect',
  passport.authenticate('facebook', { successRedirect: '/login',
                                      failureRedirect: '/login' }
  ));


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


app.listen(8000);




// http.createServer(function(request, response) {
//     if (request.url === '/'){
//         fs.readFile("../views/index.html", function(err, data){
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(data);
//             response.end();
//         });
//     }
//
//     else {
//         response.writeHead(200, {'Content-Type': 'text/html'});
//         response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
//         response.end();
//     }
//
// }).listen(8000);

