export function seed(knex) {
    const users = [
        {
            username: "admin1",
            email: 'admin1@gmail.com',
            password: 'bigSecret123',
            role: 1
        },
        {
            username: "user1",
            email: 'user1@gmail.com',
            password: 'smallSecret123',
            role: 2
        },
        {
            username: "user2",
            email: 'user2@gmail.com',
            password: 'notsobigSecret123',
            role: 2
        }
    ]

    return knex('users')
        .insert(users)
            .then(() => console.log('\n== seed data for users table added ==\n'));
}