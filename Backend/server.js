const mysql = require('mysql');
const express = require('express');
const app = express();

let host;
let user;
let password;

let con = mysql.createConnection({
    host: host,
    user: user,
    password: password
});

app.get('CreateConnection/', (req, res) => {
    console.log('1');

    // host = req.body.host;
    // user = req.body.user;
    // password = req.body.password;
    res.send('works');

    console.log(req.body);
    // con.connect((err) => {
    //     if (err) console.log(err);
    //     console.log("Connected!");
    // });
});

app.post('GetAllDatabases/', (req, res) => {
    con.query('', (err, result) => {
        if (err) console.log(err);
        res.send("Result: " + result);
    });
});

app.post('GetAllDataInDatabase/', (req, res) => {
    con.query('', (err, result) => {
        if (err) console.log(err);
        res.send("Result: " + result);
    });
});

let server = app.listen(42000, () => {
   let host = server.address().address
   let port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
});