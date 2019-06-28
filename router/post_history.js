const express = require("express");
const router = express.Router();
// const bodyParser = require("body-parser");
const knex = require('../db/knexfile');

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

/* add call history to database*/
router.post("/api/v1/add", async function (req, res) {
    try {
        console.log(JSON.stringify(req.body));
        const result = await knex("history.call_history").insert({
            number: req.body.number,
            // time: time.now(),
            // date: Date.now(),
            call_number: req.body.call_number,
            duration: req.body.duration
        });
        res.send(result);
    } catch (error) {
        res.sendStatus(500);
    }

});
module.exports = router;