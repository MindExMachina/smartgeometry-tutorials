// Require express and create an app

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;

// Configure express body-parser as middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Create HTTP routes
app.get('/a', console.log);
// Simple GET route
app.get('/', function(req, res) {
    console.log('GET /');
    res.send('Hello, HTTP!');
});

/**
 * A GET route that takes one parameter on the URL,
 * constructs a JSON string and returns it.
 */
app.get('/color/:color', function(req, res) {

    let color = req.params.color;
    // Log color to console
    console.log('GET /color/' + color);
    res.json({ color: color });

});

// GET route with parameters after route
app.get('/color', function(req, res) {

    // Get strokes from the GET request's parameters
    let color = req.param('color');
    res.json({ color: color });

});

// Simple POST route
app.post('/year', function(req, res) {

    // Return a JSON object
    res.json({ year: 2018 });

});

// POST route with parameters
app.post('/login', function(req, res) {

    // Get image from the POST request's parameters
    var username = req.body.username;

    // Return a JSON object
    res.json({ username: username });

});

// Start the HTTP server

app.listen(3000);

console.log('Running on http://localhost:3000..');