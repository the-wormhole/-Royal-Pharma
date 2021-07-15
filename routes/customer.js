const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');
const passport = require('passport');

router.get('/profile', passport.checkAuthentication ,customerController.profile)
router.get('/sign-in',customerController.signIn);
router.get('/sign-up',customerController.signUp);

router.post('/create',customerController.create);
router.get('/sign-out',customerController.destroySession);

// Using passport middleware for authentication
router.post('/create-session', 
passport.authenticate( 'local', {failureRedirect: '/customer/sign-in'})
,customerController.createSession);

module.exports = router;