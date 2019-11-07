const express = require('express');
const controller = require('./controller');
const { isLoggedIn } = require('../auth');
const router = express.Router();

router.route('/')
    .get(isLoggedIn, (req, res) => {
        res.send([]);
    })
    .post(controller.create);

router.route('/:id')
    .get(isLoggedIn, (req, res) => {
        res.send({});
    })

router.route('/login')
    .post(controller.login);

module.exports = router;
