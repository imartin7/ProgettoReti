const express = require('express');
const controller = require('../controllers/controllers');
const { body } = require('express-validator');
const router = new express.Router();

router.get('/api/init', controller.initDatabase);
router.post('/api/register', 
    body('email').isEmail().normalizeEmail(),
    body('name').not().isEmpty().escape(),
    body('lastname').not().isEmpty().escape(), 
    body('username').not().isEmpty().escape(), 
    body('password').not().isEmpty().escape(), 
    controller.registerUser    
);
module.exports = router;