const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, 
          username: 'jonathanchen', 
          password: bcrypt.hashSync('password', 10)
        },
        { id: 2, 
          username: 'danielgao', 
          password: bcrypt.hashSync('password', 10)
        },
        { id: 3, 
          username: 'simonou', 
          password: bcrypt.hashSync('password', 10)
        }
      ]);
    });
};