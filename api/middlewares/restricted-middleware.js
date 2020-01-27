const Users = require('../../data/helpers/users-model');

function restricted(req, res, next) {
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

module.exports = restricted;