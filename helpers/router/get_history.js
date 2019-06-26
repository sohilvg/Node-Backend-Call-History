const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
const knex = require('../Node-Backend-Call-History/db/knexfile');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    //intercepts OPTIONS method
    if ("OPTIONS" === req.method) {
        //respond with 200
        res.sendStatus(200);
    } else {
        //move on
        next();
    }
});

/* get call history*/
router.get('/api/v1/history', async function (req, res) {
    const result = await knex.select("*").from("history.call_history")
    // res.render('login', { username : req.username });
    res.send(result);
});