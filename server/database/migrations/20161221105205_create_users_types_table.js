exports.up = knex => knex.schema.createTable('users_types', (table) => {
  table.increments('id').primary();
  table.string('name').unique();
  table.timestamps(true, true);
})
.then(() => knex.schema.table('users', (table) => {
  table.integer('type_id').unsigned();
  table.foreign('type_id').references('users_types.id');
}));

exports.down = knex => knex.schema.table('users', (table) => {
  table.dropForeign('type_id');
  table.dropColumn('type_id');
})
.then(() => knex.schema.dropTable('users_types'));
