const { validationResult } = require('express-validator');
const database = require('../db');
const bcrypt   = require("bcrypt");
const jwt      = require("jsonwebtoken");
const htmlEntities = require("html-entities");
const publisher = require("../chat/publisher");
const SUCCESS_CODE      = 200;
const ERROR_CODE        = 400;
const SERVER_ERROR_CODE = 500;

const initDatabase = (req, res) => {
  

  database.query(sqlQuery, (err) => {
    if (err) throw err;
    res.send({
      code: SUCCESS_CODE,
      msg: "Database initiated"
    })
  });
};

const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
      res.send(errors.array());
  } else {
      const pass = await bcrypt.hash(req.body.password,10);
      const user = {
          name: req.body.name,
          lastname: req.body.lastname,
          username: req.body.username,
          password: pass,
          email: req.body.email
      };

      const sqlQuery = 'INSERT INTO users SET ?';
      database.query(sqlQuery, user, (err, row) => {
  
          if (err) {
            if(err.errno == 1062){
              res.send({
                code: ERROR_CODE,
                msg: "User with email already exists"
              }); 
              return;
            }
            res.send({
              code: SERVER_ERROR_CODE,
              msg: "Unknown error: "+err
            }); 
            return;
          }

          res.send({
            code: SUCCESS_CODE,
            msg: "User registrated"
          });
      });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
      res.send(errors.array());
  } else {
      const user = req.body.email;
      const password = req.body.password;

      const sqlQuery = "Select * from users where email = ?";

      database.query(sqlQuery, user, async (err, row) => {
        if (!err) {
          if (row.length == 0) {
            res.send({
              code: ERROR_CODE,
              msg: "Email or password are incorrect"
            }); 
            return; 

          } else {
            const hashedPassword = row[0].password;
            if (await bcrypt.compare(password, hashedPassword)) {
              res.send({
                code: SUCCESS_CODE,
                msg: "Login successful",
                data: {
                  email:    row[0].email,
                  id:       row[0].id,
                  image:    row[0].image,
                  lastname: row[0].lastname,
                  name:     row[0].name,
                  username: row[0].username,
                  token: jwt.sign({userId: row[0].id},'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' })
                }
              });
              return;
            } else {
              res.send({
                code: ERROR_CODE,
                msg: "Email or password are incorrect"
              }); 
              return;
            } 
          }
        }

        res.send({
          code: SERVER_ERROR_CODE,
          msg: "Unknown error"
        }); 
      });
  }
};


const setUserLogo = async (req, res) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
      res.send(errors.array());
  } else {
    let sqlQuery = `UPDATE users SET image = ? WHERE id = ?`;
    let data = [htmlEntities.decode(req.body.url), req.body.id];

    database.query(sqlQuery, data, (err, row) => {
      if (err) {
        res.send({
          code: SERVER_ERROR_CODE,
          msg: "Unknown error"
        });
        return;
      }

      data = [req.body.id];
      sqlQuery = "Select id,name,lastname,username,email,image from users where id = ?";

      database.query(sqlQuery, data, (err, row) => {
        if (err) {
          res.send({
            code: SERVER_ERROR_CODE,
            msg: "Unknown error"
          });
          return;
        }
        
        res.send({
          code: SUCCESS_CODE,
          msg: "Image set properly",
          data: {
            email:    row[0].email,
            id:       row[0].id,
            image:    row[0].image,
            lastname: row[0].lastname,
            name:     row[0].name,
            username: row[0].username
          }
        });
    
      });
    });
  }
};

const addUserImage = async (req, res) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
      res.send(errors.array());
  } else {
    let sqlQuery = `INSERT INTO user_images (userid, image) VALUES (?,?)`;
    let data = [req.body.id, htmlEntities.decode(req.body.url)];

    database.query(sqlQuery, data, (err, row) => {
      if (err) {
        res.send({
          code: SERVER_ERROR_CODE,
          msg: "Unknown error"
        });
        return;
      }
        
      res.send({
        code: SUCCESS_CODE,
        msg: "Image set properly",
      });
    });
  }
};


const getUserFeed = async (req,res) => {
  const errors = validationResult(req);

  if (errors.array().length > 0) {
      res.send(errors.array());
  } else {
    const sqlQuery = `Select * from user_images where userid = ?`;
    const data = [req.body.userid];

    database.query(sqlQuery, data, (err, row) => {
      if (err) {
        res.send({
          code: SERVER_ERROR_CODE,
          msg: "Unknown error"
        });
        return;
      }
        
      res.send({
        code: SUCCESS_CODE,
        msg: "Feed loaded",
        data: row
      });
    });
  }
};

const sendUserMessage = async (req,res) => {
  console.log(publisher);
  publisher.publisher();
  return res.send({
    code: SUCCESS_CODE
  });
};

module.exports = {
  initDatabase,
  loginUser,
  registerUser,
  setUserLogo,
  addUserImage,
  getUserFeed,
  sendUserMessage
}