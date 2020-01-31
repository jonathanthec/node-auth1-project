const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../../data/helpers/users-model');
const { checkPassword, checkSession, checkUser } = require('../middlewares/restricted-middleware');

router.post('/register', checkUser, (req, res) => {
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
    res.status(200).json({ message: `Welcome, ${req.headers.username}! You're logged in.` });
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
router.get('/logout', checkSession, (req, res) => {
    req.session.destroy(err => {
        if (err) {
          res.send('error logging out');
        } 
        else {
          res.send('good bye');
        }
    })
})

module.exports = router;