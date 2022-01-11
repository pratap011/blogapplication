
var express = require('express')
var app = express()
var db = require('./db')
var bodyParser = require('body-parser')
var login = require('./routes/login.js')
var register = require('./routes/register')
const createPost = require('./routes/createPost')
const addPolls = require('./routes/addpolls')
const viewPolls = require('./routes/viewPolls')
const recovery = require('./routes/recovery')
const favourites = require('./routes/favourites')
const PORT = 5000
const cors = require('cors');
const viewBlog = require('./routes/viewBlog')
const likes = require('./routes/likes')

app.use(bodyParser.urlencoded({ extended: false }))
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));
// parse application/jsons
app.use(bodyParser.json())

app.use('/register', register);
app.use('/login', login);
app.use("/createpost", createPost);
app.use("/addpolls", addPolls);
app.use("/viewpolls", viewPolls);
app.use("/recovery", recovery);
app.use("/favourites", favourites);
app.use('/viewblog', viewBlog);
app.use("/likes", likes);
app.get("/", (req, res) => {
    db.query(`SELECT * FROM blogposts ORDER BY id DESC LIMIT 11`, (error, results) => {
        if (error) {
            console.log(error)
        }
        else {
            res.send(results)
        }
    })
    // connection.query(`INSERT INTO auth_users VALUES ('6', '${name}','${lname}','${username}','${password}','${date}')`, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     }
    //     else {
    //         console.log("Added successfully")
    //     }
    // })
})


app.listen(PORT, (err) => {

    if (err) {
        console.log(err)
    }
    else {
        console.log("Server is running successfully")
    }
})