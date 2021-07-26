const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts_controller');
const passport = require('passport');

router.post('/create',passport.checkAuthentication,PostsController.create);

module.exports = router;