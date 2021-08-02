const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homecontroller');

router.get('/',homeController.homePosts);

router.post('/new-med',homeController.create);

router.get('/delete-med/',homeController.destroy);

router.use('/customer',require('./customer'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

router.get('/list',homeController.home);

module.exports = router;