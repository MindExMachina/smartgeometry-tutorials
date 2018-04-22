// HTTP server
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

// Configure express body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// HTTP GET route

app.get('/', function(req, res) {
    console.log('GET /');
    res.send('Hello, <strong>this</strong> works!');
});

app.get('/color/:color', function(req, res) {
    let color = req.params.color;
    res.json({ color: color });
});

app.get('/add/:a/:b', function(req, res) {
    let a = parseInt(req.params.a);
    let b = parseInt(req.params.b);
    let result = a + b;
    res.json({ result: result });
});

app.post('/add', function(req, res) {
    let a = parseInt(req.body.a);
    let b = parseInt(req.body.b);
    let result = a + b;
    res.json({ result: result });
});

app.post('/year', function(req, res) {
    res.json({ year: 2018 });
});

app.post('/login', function(req, res) {
    let username = req.body.username;
    res.json({ username: username });
});

app.listen(port);

console.log('Running on http://localhost:3000..');