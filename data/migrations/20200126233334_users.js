exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', tbl => {
            tbl.increments();
            tbl.string('username', 128)
                .unique()
                .index()
                .notNullable();
            tbl.string('password')
                .notNullable();
        })
};

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTableIfExists('users')
};