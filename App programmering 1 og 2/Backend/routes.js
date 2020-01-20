module.exports = (app) => {

  const mysql = require('mysql');

  let host = "127.0.0.1";
  let user = "root";
  let password = "";
  let port = "3306";

  let dbcon = mysql.createConnection({
    host: host,
    user: user,
    password: password,
    port: port,
    multipleStatements: true
  });

  dbcon.connect((err) => {
    if (err) {
        console.log(err);
        //res.json({connected: false});
    } else {
      console.log("con");
        //res.json({connected: true});
    }
  });

  app.post('/', (req, res) => {
    host = req.body.host;
    user = req.body.user;
    password = req.body.password;
    port = req.body.port;

    dbcon.connect((err) => {
        if (err) {
            console.log(err);
            res.json({connected: false});
        } else {
            res.json({connected: true});
        }
    });
  });

  app.post('/GetAllOverView', (req, res) => {
    dbcon.query("SELECT TABLE_SCHEMA, TABLE_NAME, TABLE_TYPE FROM information_schema.tables WHERE table_schema NOT IN ( 'information_schema', 'performance_schema', 'mysql', 'phpmyadmin' ) ORDER BY TABLE_SCHEMA;", [], (dberr, dbRes) => {
        if (dberr) {
            console.log(dberr);
            res.json({overViewData: false});
        } else {
          res.json({overViewData: dbRes});
        }
    });
  });

  app.post('/GetData', (req, res) => {
    let sql;

    if(req.body.type == "VIEW") {
      sql = 'SHOW CREATE VIEW ??;';
    } else if(req.body.type == "BASE TABLE") {
      sql = 'SELECT * FROM ??;';
    }

    dbcon.query(`USE ??; ${sql}`, [req.body.db, req.body.table], (err, result) => {
      if (err) { 
        console.log(err);
      } else {
        res.json(result);
      }
    });
  });

}