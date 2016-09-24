/*------------------------------------*\
    THIS IS TEMPORARY AND USED FOR TESTING
    DO NOT USE THIS FILE IN A PROD ENV
\*------------------------------------*/

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/saveContent', function(req, res, next) {
    fs.writeFile( '../theme/content.json', JSON.stringify( req.body ) );
});

app.post('/saveTheme', function(req, res, next) {
    fs.writeFile( '../theme/theme.json', JSON.stringify( req.body ) );
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
