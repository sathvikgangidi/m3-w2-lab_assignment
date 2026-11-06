const { check, validationResult } = require('express-validator');
const path = require('path');
const auth = require('http-auth');
const mongoose = require('mongoose');
const Registration = mongoose.model('Registration');
const express = require('express');
const router = express.Router();

const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
});

router.get('/', function(req, res) {
    res.render('form', {
        title: 'Registration form',
        data: {}
    });
});


router.post(
    '/',
    [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Please enter a name'),

        check('email')
            .isLength({ min: 1 })
            .withMessage('Please enter an email')
    ],
    function(req, res) {

        const errors = validationResult(req);

       
if (errors.isEmpty()) {

    const registration = new Registration(req.body);

    registration.save()
        .then(() => {
            res.send('Thank you for your registration!');
        })
        .catch((err) => {
            console.log(err);
            res.send('Sorry! Something went wrong.');
        });

} else {
    res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body
    });
}
    }
);


router.get('/registrations', basic.check((req, res) => {
    Registration.find()
        .then((registrations) => {
            res.render('index', {
                title: 'Listing registrations',
                registrations: registrations
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Something went wrong.');
        });
}));



module.exports = router;