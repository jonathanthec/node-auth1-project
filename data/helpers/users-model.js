const Users = require('../dbConfig');

function find() {
    return Users('users')
        .select('id', 'username', 'password')
        .orderBy('id', 'asc');
}

function findBy(property) {
    return Users('users')
        .where(property)
        .first();
}

function add(user) {
    return Users('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return findBy({ id });
        })
}

module.exports = {
    find,
    findBy,
    add
}