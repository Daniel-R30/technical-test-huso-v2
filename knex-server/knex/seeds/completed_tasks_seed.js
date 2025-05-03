exports.seed = async function(knex) {
    await knex('completed_tasks').del(); // Clean first
    await knex('completed_tasks').insert([
      {
        id: '1746213176',
		title: 'Task Test 7',
		description: 'This is a completed task',
		image: 'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
		status: 'Completed',
		assigned: 'Me',
		timestamp: '1746213176',
		completed_at: new Date(),
      }
    ]);
  };