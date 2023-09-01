const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { isNotLoggedIn, isLoggedIn } = require('../middleware')
const users = require('../controllers/users')


router.route('/register')
    .get(isNotLoggedIn, users.renderRegister)
    .post(isNotLoggedIn, catchAsync(users.register));

router.route('/login')
    .get(isNotLoggedIn, users.renderLogin)
    .post(isNotLoggedIn, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)



router.get('/logout', users.logout)

router.get('/:profile', isLoggedIn, users.rednerProfile)

module.exports = router;