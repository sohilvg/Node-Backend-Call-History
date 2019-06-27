const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const knex = require('./helpers/knex');
const gethistory = require('./router/get_history');
const posthistory = require('./router/post_history');
const login = require('./router/login');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    res.locals.user = req.user || null;
    //intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});
app.use(bodyParser.json());
app.use(express.json());
app.use(gethistory);
app.use(posthistory);
app.use(login);


// dotenv.config();

// Connection.connect(function (error) {
//     console.log("connected to db");
// })
const port = process.env.PORT || 2000;

const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
});