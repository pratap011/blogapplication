const express = require('express');
const viewPolls = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');

viewPolls.use(bodyParser.json());

viewPolls.get("/", (req, res) => {
    db.query(`SELECT * FROM polls ORDER BY id DESC`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
    })
})

viewPolls.get("/specific", (req, res) => {
    db.query(`SELECT * FROM polls WHERE id=${req.query.id}`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result)
        }
    })
})

viewPolls.post("/", (req, res) => {
    if (req.body.choice == "1") {
        db.query(`UPDATE polls SET option_one_count = option_one_count+1 WHERE id=${req.body.id}`, (err, result) => {
            if (err) throw err;
            else {
                res.send("Updated successfully!")
            }
        })
    }
    else if (req.body.choice == "2") {
        db.query(`UPDATE polls SET option_two_count = option_two_count+1 WHERE id=${req.body.id}`, (err, result) => {
            if (err) throw err;
            else {
                res.send("Updated successfully!")
            }
        })
    }

    else {
        db.query(`UPDATE polls SET option_three_count = option_three_count+1 WHERE id=${req.body.id}`, (err, result) => {
            if (err) throw err;
            else {
                res.send("Updated successfully!")
            }
        })
    }
})

module.exports = viewPolls;