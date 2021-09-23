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
      })
      .createTable('books', table => {
            table
                .increments();
            table
                .string('title', 256)
                .notNullable();
            table
                .string('author', 256)
                .notNullable();
            table
                .text('description', 'longtext')
                .notNullable();
            table
                .integer('year_published')
                .notNullable();
            table
                .string('category', 256)
                .notNullable();
            table
                .string('ISBN', 13)
                .notNullable()
                .unique();
            table
                .decimal('price', 5, 2)
                .notNullable()
                .defaultTo(0);
            table
                .string('book_cover_path')
                .notNullable();
      })
      .createTable('checkout', table => {
            table
                .increments();
            table
                .integer('renterId')
                .unsigned()
                .references('users.id')
                .onUpdate('CASCADE');
            table
                .timestamp('borrow_date')
                .defaultTo(knex.fn.now());
            table
                .integer('price')
            table
                .date('due_date')
                .defaultTo(knex.raw(`? + ?::INTERVAL`, [knex.fn.now(), '30 day']));
      })
      .createTable('rental', table => {
            table
                .increments();
            table
                .integer('borrowId')
                .references('checkout.id')
                .onUpdate('CASCADE');
            table
                .integer('bookId')
                .references('books.id')
                .onUpdate('CASCADE');
            table
                .unique(['id', 'borrowId', 'bookId']);
            table
                .timestamp('date_of_return')
      })
      .createTable('cart', table => {
            table
                .increments();
            table
                .integer('userId')
                .unsigned()
                .references('users.id');
            table
                .timestamp('date_created');
      })
      .createTable('cart_item', table => {
            table
                .increments();
            table
                .integer('cartId')
                .unsigned()
                .references('cart.id')
            table
                .integer('bookId')
                .unsigned()
                .references('book.id')
            table
                .timestamp('date_added');
      })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('roles')
    .dropTableIfExists('books')
    .dropTableIfExists('checkout')
    .dropTableIfExists('rental');
};
