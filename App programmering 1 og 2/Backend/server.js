const mysql = require('mysql');
// const bodyParser = require('body-parser');
// const express = require('express');
// const app = express();

// // body limit is 10
// app.use(bodyParser.json({ limit: '10kb' }));

// let host;
// let user;
// let password;

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect((err) => {
    if (err) console.log(err);
    console.log("works");
});

// app.post('/', (req, res) => {
//     console.log(req.body);    

//     host = req.body.host;
//     user = req.body.user;
//     password = req.body.password;

//     con.connect((err) => {
//         if (err) console.log(err);
//         res.json("Connected");
//     });
// });

// app.post('GetAllDatabases/', (req, res) => {
//     con.query('', (err, result) => {
//         if (err) console.log(err);
//         res.send("Result: " + result);
//     });
// });

// app.post('GetAllDataInDatabase/', (req, res) => {
//     con.query('', (err, result) => {
//         if (err) console.log(err);
//         res.send("Result: " + result);
//     });
// });

// let server = app.listen(42000, () => {
//    let host = server.address().address
//    let port = server.address().port
   
//    console.log("App listening at http://%s:%s", host, port)
// });