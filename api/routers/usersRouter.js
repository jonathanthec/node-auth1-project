const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../../data/helpers/users-model');
const { checkPassword, checkSession, checkUser } = require('../middlewares/restricted-middleware');

router.post('/register', (req, res) => {
    const newUser = req.body;
    const hash = bcrypt.hashSync(newUser.password, 10);
    newUser.password = hash;
    Users
        .add(newUser)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({ message: 'error registering' })
        })
})

router.post('/login', checkPassword, (req, res) => {
    res.status(200).json({ message: `Welcome, ${req.headers.username}!` });
});

router.get('/users', checkSession, (req, res) => {
    Users
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(() => {
            res.status(500).json({ message: 'error getting users list '});
        })
})

module.exports = router;