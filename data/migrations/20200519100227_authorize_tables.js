
exports.up = function(knex) {
  return knex.schema.createTable('profiles',prof=>{
      prof.increments();
      prof.string('username').notNullable().unique();
      prof.string('passowrd').notNullable();
      prof.string('department').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('profiles');
};
