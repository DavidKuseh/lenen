const db = require('../../db/connection');

async function addNewUser(user) {
    try {
        const ids = await db('users').insert(user, 'id');
        const id = ids[0];
        const response = await getUserById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getUserById(id) {
    try {
        const user = await db('users')
            .select('id', 'email', 'role')
            .where({id: id})
            .first();
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getBy(filter) {
    try {
        const user = await db('users as u')
        .join('roles as r', 'u.role', '=', 'r.id')
        .select('u.id', 'u.password', 'r.name as role', 'u.email')
        .where(filter)
        .first()
        return user;
    } catch(error) {
        console.log(error)
    }
}

async function getUsers() {
    try {
        const users = await db('users')
            .select('id', 'email', 'role')
        return users;
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addNewUser,
    getUserById,
    getBy,
    getUsers
}