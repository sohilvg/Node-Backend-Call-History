const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const privatekey = 'smit45#bhayo';
const knex = require('../db/knexfile');
const algorithm = 'aes-128-cbc';
const my_secret = 'ha558moj##ha$$';

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
/* restration*/
router.post('/api/v1/signup', async (req, res, next) => {
    // const data = req.data
    // const token = jwt.sign({ data }, privatekey, {
    //     expiresIn: '24h' // expires in 24 hours
    // });
    // console.log(token);
    if (!req.body.username || !req.body.password && !req.body.email) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        try {

            // const encrypt_username = encrypt(req.body.username);
            // const encrypt_password = encrypt(req.body.password);
            const data = req.data
            // const token = jwt.sign({ data }, my_secret, {
            //     expiresIn: '24h' // expires in 24 hours
            // });

            // console.log(token)
            const result = await knex("history.login")
                // .distinct(username, password, email)
                .insert({ username: req.body.username, password: req.body.password, email: req.body.email })
                .returning('*')

            res.send(result)
            // jwt.verify(req.token, privatekey, (err, authData) => {
            //     console.log(authData)
            //     if (err) {
            //         res.sendStatus(403);

            //     } else {
            //         return res.send({
            //             status: "SUCCESS",
            //             message: "User created "
            //             // authData
            //         })
            //     }
            // })

        } catch (error) {

            console.error(error);
        }
    }

});
const encrypt = (text) => {
    var cipher = crypto.createCipher(algorithm, my_secret)
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

/*login user api*/
router.post('/api/v1/login', async (req, res, next) => {
    const { body } = req;
    const { username } = body;
    const { password } = body;
    // const { email } = body;    // const data = req.data

    if (!req.body.username && !req.body.password) {
        res.status(400).send({ msg: 'Please pass username and password.' })
    } else {
        try {
            // const data = req.data

            // const encrypted_username = encrypt(data);
            // const encrypted_password = encrypt(req.body.password);
            const user = await knex("history.login").where({
                // email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }).first();
            // const user = await knex("usermanagement.users")
            //     .select("users.username", "users.password").first();
            // // const decrepted_username = decrypt(user.username);
            // // const decrepted_password = decrypt(user.password);
            // console.log(decrepted_username);

            //checking to make sure the user entered the correct username/password combo
            if (username === user.username && password === user.password) {
                jwt.sign({ user }, privatekey, { expiresIn: '2h' }, (err, token) => {
                    if (err) { console.log(err) }
                    res.send(token);
                    res.json({
                        message: 'Successful log in'
                    });
                });
                console.log('Successful log in');
            } else {
                console.log('ERROR: Could not log in');
            }
            // }
        } catch (error) {
            console.error('ERROR: Could not log in');

        }
    }

});
const decrypt = (text) => {
    var decipher = crypto.createDecipher(algorithm, my_secret)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}
module.exports = router;