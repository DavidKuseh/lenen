export function up (knex) {
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
                .notNullable();
            table
                .integer('role')
                .unsigned()
                .references('roles.id')
                .onUpdate('CASCADE')
                .defaultTo(2);
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
        .createTable('cart', table => {
            table
                .increments();
            table
                .integer('user_id')
                .unsigned()
                .references('users.id');
            table
                .timestamp('modified_on');
            table
                .timestamp('date_created')
                .defaultTo(knex.fn.now());
        })
        .createTable('cart_item', table => {
            table
                .increments();
            table
                .integer('cart_id')
                .unsigned()
                .references('cart.id');
            table
                .integer('book_id')
                .unsigned()
                .references('books.id');
            table
                .timestamp('date_added')
                .defaultTo(knex.fn.now());
        })
        .createTable('checkout', table => {
            table
                .increments();
            table
                .integer('renter_id')
                .unsigned()
                .references('users.id')
                .onUpdate('CASCADE');
            table
                .timestamp('borrow_date')
                .defaultTo(knex.fn.now());
            table
                .integer('price');
            table
                .date('due_date')
                .defaultTo(knex.raw(`? + ?::INTERVAL`, [knex.fn.now(), '30 day']));
        })
        .createTable('rental', table => {
            table
                .increments();
            table
                .integer('borrow_id')
                .references('checkout.id')
                .onUpdate('CASCADE');
            table
                .integer('book_id')
                .references('books.id')
                .onUpdate('CASCADE');
            table
                .unique(['id', 'borrow_id', 'book_id']);
            table
                .timestamp('date_of_return');
        })
}

export function down (knex) {
    return knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('roles')
        .dropTableIfExists('books')
        .dropTableIfExists('checkout')
        .dropTableIfExists('rental');
}
