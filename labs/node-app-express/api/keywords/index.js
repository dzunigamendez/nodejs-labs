const express = require('express');
const controller = require('./controller')
const { isLoggedIn } = require('../auth');
const router = express.Router();

router.route('/')
    .get(controller.search)
    .post(isLoggedIn, controller.create);

router.route('/:id')
    .get(controller.readById)
    .put(isLoggedIn, controller.update)
    .delete(isLoggedIn, controller.remove);

module.exports = router;