const mysql = require('mysql');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// body limit is 10
app.use(bodyParser.json({ limit: '10kb' }));

let host;
let user;
let password;
let port;

let con = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    port: port
});

app.post('/', (req, res) => {
    host = req.body.host;
    user = req.body.user;
    password = req.body.password;
    port = req.body.port;

    con.connect((err) => {
        if (err) {
            console.log(err);
            res.json({connected: false});
        } else {
            res.json({connected: true});
        }
    });
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