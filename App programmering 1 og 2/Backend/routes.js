module.exports = (app) => {

  const mysql = require('mysql');
  let dbcon;

  // dbcon = mysql.createConnection({
  //   host: "127.0.0.1",
  //   user: "root",
  //   password: "",
  //   port: "3306",
  //   multipleStatements: true
  // });

  // dbcon.connect((err) => {
  //   if (err) {
  //       console.log(err);
  //       //res.json({connected: false});
  //   } else {
  //     console.log("con");
  //       //res.json({connected: true});
  //   }
  // });

  app.post('/CreateConnection', (req, res) => {
    dbcon = mysql.createConnection({
      host: req.body.host,
      user: req.body.user,
      password: req.body.password,
      port: req.body.port,
      multipleStatements: true
    });

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
    dbcon.query("SELECT db.SCHEMA_NAME, tb.TABLE_NAME, tb.TABLE_TYPE FROM information_schema.SCHEMATA AS db LEFT JOIN information_schema.TABLES AS tb ON tb.TABLE_SCHEMA = db.SCHEMA_NAME WHERE SCHEMA_NAME NOT IN ('information_schema', 'performance_schema', 'mysql', 'phpmyadmin', 'test') ORDER BY TABLE_SCHEMA;", [], (dberr, dbRes) => {
        if (dberr) {
            console.log(dberr);
            res.json({overViewData: false});
        } else {
          res.json({overViewData: dbRes});
        }
    });
  });

  app.post('/GetAllUsers', (req, res) => {
    dbcon.query("SELECT GRANTEE, PRIVILEGE_TYPE FROM information_schema.user_privileges ORDER BY GRANTEE;", [], (dberr, dbRes) => {
        if (dberr) {
            console.log(dberr);
            res.json({usersData: false});
        } else {
          res.json({usersData: dbRes});
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

  app.post('/GetAllDb', (req, res) => {
    dbcon.query("SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME NOT IN ( 'information_schema', 'performance_schema', 'mysql', 'phpmyadmin', 'test' );", [], (dberr, dbRes) => {
      if (dberr) {
        console.log(dberr);
        res.json({allDb: false});
      } else {
        res.json({allDb: dbRes});
      }
    });
  });

  app.post('/GetAllTabels', (req, res) => {
    dbcon.query("SELECT TABLE_NAME, TABLE_TYPE FROM information_schema.tables WHERE TABLE_SCHEMA = ? AND TABLE_SCHEMA NOT IN ( 'information_schema', 'performance_schema', 'mysql', 'phpmyadmin' );", [req.body.choosenDb], (dberr, dbRes) => {
      if (dberr) {
        console.log(dberr);
        res.json({allTb: false});
      } else {
        res.json({allTb: dbRes});
      }
    });
  });

  app.post('/DbStuff', (req, res) => {
    let sql;

    if(req.body.dbStuff == "Delete") {
      sql = 'DROP DATABASE ??;';
    } else if(req.body.dbStuff == "Create") {
      sql = 'CREATE DATABASE ??;';
    }
    
    dbcon.query(`${sql}`, [req.body.choosenDb], (dberr, dbRes) => {
      if (dberr) {
        console.log(dberr);
        res.json({dbStuff: false});
      } else {
        res.json({dbStuff: dbRes});
      }
    });
  });

  
  app.post('/TbStuff', (req, res) => {
    let sql;
    if(req.body.action == "Delete") {
      sql = 'DROP TABLE ??;';
    } else if(req.body.action == "Create") {
      sql = `CREATE TABLE ?? (${req.body.newTb.colName} ${req.body.newTb.col});`;
    }
    
    dbcon.query(`USE ??; ${sql}`, [req.body.choosenDb, req.body.choosenTb], (dberr, dbRes) => {
      if (dberr) {
        console.log(dberr);
        res.json({tbStuff: false});
      } else {
        res.json({tbStuff: dbRes});
      }
    });
  });

  app.get('/Disconnect', (req, res) => {
    console.log("dis");
    dbcon.end();
  });

}