const express = require('express')
const router = express.Router()
const User = require('../models/user')
const { body, check } = require('express-validator')
const user = require('../controller/user_routes')
const facility = require('../models/facility')
const isAuth = require('./isAuth')
router.get('/login', user.login)
router.get('/signup', user.signup)
router.get('/admin', isAuth, user.admin_service)
router.post('/addUser', [
    body('user_name')
    .custom((value, { req }) => {
        return User.find({
                name: value
            })
            .then(user => {
                if (user.length > 0) {
                    return Promise.reject('The user already exists')
                }
            })
    }),
    body('email').isEmail().withMessage('Please enter a valid email address')
    .custom((value, { req }) => {
        return User.find({ email: value })
            .then(user => {
                if (user.length > 0) {
                    return Promise.reject('This email is already in use')
                }
            })
    }).normalizeEmail(),
    body('password').isLength({ min: 10 })
    .custom((value, { req }) => {
        if (value !== req.body.confirm) {
            throw new Error('The passwords does not match')
        } else
            return true;
    }).trim()
], user.addUser);
router.post('/validateUser', user.validateUser);
router.get('/addProperty', isAuth, user.addProperty)
router.post('/registerProp', [
    body('prop_name')
    .custom((value, { req }) => {
        return facility.find({ title: value })
            .then(property => {
                if (property.length > 0) {
                    return Promise.reject('pleas use some other name since this property name already exists')
                }
            })
    }),
    body('desc').isLength({ min: 120 })
    .withMessage('Please add a detailed description')
], isAuth, user.registerProp)
router.get('/logout', isAuth, user.logout)
router.get('/change_password', user.ChangingPassword) // this route is for forgot password
router.post('/changePassword', user.changePassword) // this route is for change password
router.get('/ConfirmChange/:userId/:token', user.confirmPasswordChange)
router.get('/ConfirmChange1/:email', user.confirmPasswordChange1)
router.post('/remindPassword', user.remindPassword)
router.post('/confirmChange', [
        check('password', 'Please enter a valid password which is atleast 10 characters long') //the second key is the default message we want for all the validators check
        .isLength({ min: 10 })
        .trim() //this is a sanitization method for password
        ,
        check('password')
        .custom((value, { req }) => {
            if (value != req.body.Confirm) {
                throw new Error('The passwords you entered do not match');
            } else {
                return true;
            }
        })
    ],
    user.confirmChange)
    router.post('/confirmChange1', [
        check('password', 'Please enter a valid password which is atleast 10 characters long') //the second key is the default message we want for all the validators check
        .isLength({ min: 10 })
        .trim() //this is a sanitization method for password
        ,
        check('password')
        .custom((value, { req }) => {
            if (value != req.body.Confirm) {
                throw new Error('The passwords you entered do not match');
            } else {
                return true;
            }
        })
    ],
    user.confirmChange1)
router.get('/reviews', isAuth, user.reviews);
router.get('/facReview/:facility', isAuth, user.facReview)
module.exports = router

module.exports = router