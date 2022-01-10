
var express = require('express')
var app = express()
var db = require('../db')
var bodyParser = require('body-parser')
var register = express.Router();

register.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
register.use(bodyParser.json())

register.post("/", (req, res) => {

    var name = req.body.name
    var lname = req.body.lname
    var email = req.body.email
    var username = req.body.username
    var password = req.body.password
    let date_ob = new Date();


    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    cur_date = `${year}-${month}-${date}`
    var user_exists = false;

    //checking whether the user is already registered

    db.query(`SELECT username FROM auth_users WHERE fname='${name}'`, (err, result) => {
        if (!result.length == 0) {

            res.send("You are already registered as " + result[0].username)

        }
        else {
            //Registering the user

            db.query(`INSERT INTO auth_users (fname,lname,email,username,password,date_joined)  VALUES ( '${name}','${lname}','${email}','${username}','${password}','${cur_date}')`, (error, result) => {
                if (error) {
                    console.log(error)
                }
                else {

                    res.send("2")

                }
            })

        }
    });
    console.log(user_exists)





})

module.exports = register;