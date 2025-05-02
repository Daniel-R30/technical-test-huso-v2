exports.up = function (knex) {
	return knex.schema.createTable('completed_tasks', function (table) {
		table.text('id').primary();
		table.text('title').notNullable();
		table.text('description').notNullable();
		table.text('image').notNullable();
		table.text('status').notNullable();
		table.text('assigned').notNullable();
		table.text('timestamp').notNullable();
		table.timestamp('completed_at').defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('completed_tasks');
};
