export function seed (knex) {
  const roles = [
    {
      name: 'admin'
    },
    {
      name: 'user'
    }
  ];
  
  return knex('roles')
  .insert(roles)
  .then(() => console.log('\n== seed data for roles table added ==\n'));
}
