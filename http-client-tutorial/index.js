let superagent = require('superagent');

// superagent
//     .get('http://localhost:3000/')
//     .end((err, res) => {
//         // console.log(res.text);
//     });

// let a = 10;
// let b = 200;

// superagent
//     .post('http://localhost:3000/add')
//     .send({ a: a, b: b })
//     .end((err, res) => {
//         let result = res.body.result;
//         console.log('The result of adding ' + a + ' and ' + b + ' is ' + result);
//     });

superagent
    .get('https://api.github.com/users/garciadelcastillo')
    .end((err, res) => {
        //console.log(res.body);
        console.log(res.body.name);
        console.log(res.body.location);
    });