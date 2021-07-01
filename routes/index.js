const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homecontroller');

router.get('/',homeController.home);

router.post('/new-med',homeController.create);

router.get('/delete-med/',homeController.destroy);

router.use('/customer',require('./customer'));

module.exports = router;