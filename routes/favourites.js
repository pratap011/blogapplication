const express = require('express');
const favourites = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('../db');
const e = require('express');


favourites.use(bodyParser.json());
favourites.use(cookieParser());


favourites.get("/check", (req, res) => {
    console.log("This is running check route")
    db.query(`SELECT blogid from favourites WHERE id='${req.query.id}'`, (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {

                    if (result[i].blogid == req.query.blogid) {
                        res.send("Yes");
                        break;
                    }
                }
            }
            else {

            }



        }
    })
})

favourites.post("/", (req, res) => {
    db.query(`INSERT INTO favourites VALUES('${req.body.blogid}','${req.body.id}')`, (err, result) => {
        if (err) throw err;
        else {
            res.send("1");
        }
    })
})


favourites.use(cookieParser());

favourites.get("/", (req, res) => {
    db.query(`SELECT * FROM blogposts WHERE id IN (SELECT blogid FROM favourites WHERE id='${req.query.id}')`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result);
        }
    })
})


favourites.delete("/", (req, res) => {
    db.query(`DELETE FROM favourites WHERE favourites.id='${req.query.id}' AND favourites.blogid='${req.query.blogid}'`, (err, result) => {
        if (err) throw err;
        else {
            res.send("Deleted");
        }
    })
})
module.exports = favourites;