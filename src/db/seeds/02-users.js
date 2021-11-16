export function user_seed(knex) {
    const users = [
        {
            email: 'admin1@gmail.com',
            password: 'bigSecret123',
            role: 1
        },
        {
            email: 'user1@gmail.com',
            password: 'smallSecret123',
            role: 2
        },
        {
            email: 'user2@gmail.com',
            password: 'notsobigSecret123',
            role: 2
        }
    ]

    return knex('users')
        , insert(users)
            .then(() => console.log('\n== seed data for roles table added ==\n'));
}