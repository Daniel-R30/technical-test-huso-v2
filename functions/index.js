require('dotenv').config();
const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const knex = require('knex');
const config = require('./knex/knexfile')

const db = knex(config.development);

admin.initializeApp();

exports.updateAssigned = functions.https.onRequest(async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).send('Method not allowed');
	}

	const { path, newAssigned } = req.body;

	if (!path || !newAssigned) {
		return res
			.status(400)
			.send('Missing parameters: path and newAssigned are required');
	}

	try {
		await admin.database().ref(path).update({ assigned: newAssigned });
		return res.status(200).send('Assigned updated successfully');
	} catch (error) {
		console.error('Error updating assigned:', error);
		return res.status(500).send('Failed to update assigned');
	}
});

exports.getCompletedTasks = functions.https.onRequest(async (req, res) => {
    try {
      const tasks = await db('completed_tasks')
        .select('id', 'title', 'description', 'image', 'assigned', 'timestamp')
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error obtaining complete tasks:', error);
      res.status(500).json({ error: 'Error obtaining tasks' });
    }
});

exports.onTaskFinalized = functions.database.ref('/tasks/{taskId}')
	.onUpdate(async (change, context) => {
		const before = change.before.val();
		const after = change.after.val();
		const { taskId } = context.params;

		if (before.status === 'Completed' || after.status !== 'Completed')
			return null;

		try {
			await db('completed_tasks').insert({
				id: taskId,
				title: after.title,
				description: after.description,
				image: after.image,
				image: after.status,
				assigned: after.assigned,
				timestamp: after.timestamp,
				completed_at: new Date(),
			});

			await admin.database().ref(`/tasks/${taskId}`).remove();

			functions.logger.info(
				`Task $ {taskid} moved to postgresql and eliminated from realtime db.`
			);
		} catch (error) {
			functions.logger.error('Error moving task finished:', error);
		}

		return null;
	});