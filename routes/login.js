var express = require('express')
var app = express();
const login = express.Router();
var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
var db = require('../db')

login.use(bodyParser.json());
login.use(cookieParser())

login.post("/", (req, res) => {

    console.log(req.cookies)
    if (req.cookies.userData) {
        res.send(2)
    }
    else {
        var name = req.body.username;
        var password = req.body.password;
        db.query(`SELECT username,password,id FROM auth_users WHERE username='${name}'`, (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                console.log("not reg")
                res.send("1")//1

            }
            else {
                if (result[0].password == password) {
                    const cookieData = {
                        username: name,
                        password: password,
                        id: result[0].id
                    }
                    console.log("yes")
                    res.send(cookieData)

                }
                else {
                    res.send("2");
                    console.log("2")

                }
            }
        })
    }


})


module.exports = login