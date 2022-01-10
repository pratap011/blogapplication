const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const createPost = express.Router();
createPost.use(cookieParser());
var db = require('../db');
createPost.use(bodyParser.json());
createPost.post("/", (req, res) => {


    //collecting data from forms
    const title = req.body.title;
    const content = req.body.content;
    const category = req.body.category;
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();
    cur_date = `${year}-${month}-${date}`

    //sql query
    db.query(`INSERT into blogposts (title,category,content,likes,date_posted,posted_by) VALUES ('${req.body.title}','${req.body.category}','${req.body.content}',0,'${cur_date}','${req.query.id}')`, (err, result) => {
        db.query(`SELECT id from blogposts WHERE title='${req.body.title}'`, (error, result1) => {
            if (error) throw error;
            else {
                res.send(result1);
            }
        })
    })


})

module.exports = createPost;