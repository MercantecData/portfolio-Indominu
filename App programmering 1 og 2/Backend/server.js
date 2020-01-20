const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// body limit is 10
app.use(bodyParser.json({ limit: '100kb' }));

require('./routes.js')(app);

let server = app.listen(42000, () => {
    let host = server.address().address
    let port = server.address().port
    
    console.log("App listening at http://%s:%s", host, port)
 });