const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,PostsController.create);

router.get('/destroy/:id',passport.checkAuthentication,PostsController.destroy);

module.exports = router;