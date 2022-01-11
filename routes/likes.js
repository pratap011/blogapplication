const express = require('express');
const likes = express.Router();
const db = require('../db');


likes.get("/check", (req, res) => {
    db.query(`SELECT postid FROM blog_likes WHERE liked_by='${req.query.id}'`, (err, result) => {
        if (err) throw err;
        else {
            if (result.length > 0) {
                console.log(req.query.blogid);
                for (let i = 0; i < result.length; i++) {
                    console.log(result[i])
                    if (result[i].postid == req.query.blogid) {
                        res.send("1");
                        break;
                    }
                }
            }
        }
    })
})

likes.post("/", (req, res) => {
    db.query(`INSERT INTO blog_likes VALUES('${req.body.postid}','${req.body.liked_by}')`, (err, result) => {
        if (err) throw err;
        else {
            res.send('Added')
        }
    })
})



module.exports = likes;