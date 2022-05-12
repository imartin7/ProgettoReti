const { validationResult } = require('express-validator');
const database = require('../db');

const SUCCESS_CODE      = 200;
const ERROR_CODE        = 400;
const SERVER_ERROR_CODE = 500;

const initDatabase = (req, res) => {
  const sqlQuery =  `CREATE TABLE IF NOT EXISTS users(
    id            int(10) not null auto_increment primary key,
    email         varchar(255) not null unique,
    username      varchar(255) not null unique,
    password      varchar(255) default null,
    name          varchar(255) default null,
    lastname      varchar(255) default null,
    image         varchar(255) default null,
    active        tinyint(1) default null
  )`;

  database.query(sqlQuery, (err) => {
    if (err) throw err;
    res.send({
      code: SUCCESS_CODE,
      msg: "Database initiated"
    })
  });
};

const registerUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
      res.send(errors.array());
  } else {
      const user = {
          name: req.body.name,
          lastname: req.body.lastname,
          username: req.body.username,
          password: req.body.password,
          email: req.body.email
      };

      const sqlQuery = 'INSERT INTO users SET ?';

      database.query(sqlQuery, user, (err, row) => {
          if (err) throw err;

          res.send({
            code: SUCCESS_CODE,
            msg: "User registrated"
          });
      });
  }
};


module.exports = {
  initDatabase,
  registerUser
}