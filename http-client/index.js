let superagent = require('superagent');

superagent
    .get('http://localhost:3000/')
    .end((err, res) => {
        console.log('Response of / GET');
        console.log(res.text);
    });

superagent
    .post('http://localhost:3000/add')
    .send({ a: 3, b: 4 })
    .end((err, res) => {
        console.log('Response of /add POST { a: 3, b: 4 }');
        console.log(res.body);
    });