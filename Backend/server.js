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


app.post('CreateConnection/', (req, res) => {
    host = req.body.host;
    user = req.body.user;
    password = req.body.password;
    con.connect((err) => {
        if (err) throw err;
        console.log("Connected!");
    });

    res.send('Hello World');
})

var server = app.listen(42000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})