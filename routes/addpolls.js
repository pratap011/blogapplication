const express = require('express');
const addPolls = express.Router();
const db = require('../db');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { application } = require('express');

addPolls.use(bodyParser.json());
addPolls.use(cookieParser());

addPolls.post("/", (req, res) => {
    db.query(`INSERT INTO polls (question,option_one,option_two,option_three,category,posted_by) VALUES ('${req.body.question}','${req.body.option_one}','${req.body.option_two}','${req.body.option_three}','${req.body.category}','${req.query.id}')`, (err, result) => {
        if (err) throw err;
        else {
            res.send("1");
        }
    })
})

module.exports = addPolls;