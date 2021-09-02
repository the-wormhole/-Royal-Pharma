const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');
const passport = require('passport');

router.get('/profile/:id', passport.checkAuthentication ,customerController.profile)
router.get('/sign-in',customerController.signIn);
router.get('/sign-up',customerController.signUp);


router.post('/create',customerController.create);
router.post('/update/:id',passport.checkAuthentication,customerController.update);
router.get('/sign-out',customerController.destroySession);

// Using passport middleware for authentication
router.post('/create-session', 
passport.authenticate( 'local', {failureRedirect: '/customer/sign-in'})
,customerController.createSession);

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']})); //<<----- Route used here is configured by google, further it returns the information in profile variable which doesn't include Email which has been accessed separately
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect:'/customer/sign-in'}),customerController.createSession);
//<<-- This route is the one that we declared while creating google credentials, to redirect to after autherntication
module.exports = router;