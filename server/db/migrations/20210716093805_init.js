exports.up = function(knex) {
    return knex.schema
        .createTable('roles', table => {
            table
                .increments();
            table
                .string('name', 128)
                .notNullable()
                .unique();
        })
        .createTable('users', table => {
            table
                .increments();
            table
                .string('email', 128)
                .notNullable()
                .unique();
            table   
                .string('password', 128)
                .notNullable()
            table
                .integer('role')
                .unsigned()
                .references('roles.id')
                .onUpdate('CASCADE')
                .defaultTo(2)
      });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles');
};
