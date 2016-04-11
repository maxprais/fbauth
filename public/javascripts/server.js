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

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');
app.engine('html', require('jade').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
       res.render('index');
    });

passport.use(new FacebookStrategy({
        clientID: '572142882949200',
        clientSecret: 'c517fe05925ff09486c7c62f85d64829',
        callbackURL: "/redirect"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate(profile, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.use('/', router);

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

