const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customercontroller');

router.get('/sign-in',customerController.signIn);
router.get('/sign-up',customerController.signUp);

router.post('/create',customerController.create);
router.post('/create-session',customerController.createSession);

router.get('/customer-profile',customerController.customerProfile);

module.exports = router;