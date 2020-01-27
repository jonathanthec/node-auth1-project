const Users = require('../../data/helpers/users-model');
const bcrypt = require('bcryptjs');

function checkPassword(req, res, next) {
    const { username, password } = req.headers;

    if(username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if(user && bcrypt.compareSync(password, user.password)) {
                    next();
                }
                else {
                    res.status(401).json({ message: 'invalid credentials' });
                }
            })
            .catch(error => {
                res.status(500).json({ message: 'unexpected error' })
            });
    }
    else {
        res.status(400).json({ message: 'no credentials provided' });
    }
}

function checkSession(req, res, next) {
    if(req.session && req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ message: 'you shall not pass' });
    }
}

module.exports = {
    checkPassword,
    checkSession
};