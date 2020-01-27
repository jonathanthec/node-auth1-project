const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../../data/helpers/users-model');
const checkPassword = require('../middlewares/restricted-middleware');

router.post('/register', (req, res) => {

})

router.post('/login', checkPassword, (req, res) => {

})

router.get('/users', (req, res) => {

})

module.exports = router;