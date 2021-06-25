const express = require('express');
const router = express.Router();
const db = require('../config/mongoose');
const Med = require('../models/medicine');
const homeController = require('../controllers/homecontroller');

router.get('/',homeController.home);

router.post('/new-med',homeController.create);

router.get('/delete-med/',homeController.destroy);


module.exports = router;