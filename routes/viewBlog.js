const express = require('express');
const viewBlog = express.Router();
const bodyParser = require('body-parser');
const db = require('../db')
viewBlog.use(bodyParser.json());

viewBlog.get('/', (req, res) => {
    db.query(`SELECT * FROM blogposts WHERE id='${req.query.id}'`, (err, result) => {
        if (err) throw err;
        else {
            res.send(result);
        }
    })
})

module.exports = viewBlog;