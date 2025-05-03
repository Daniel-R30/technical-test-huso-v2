require('dotenv').config();

const config = require('./knex/knexfile');
const cors = require('cors');
const express = require('express');
const knex = require('knex');

const db = knex(config.development);

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Backend server in http://localhost:${PORT}`);
});

const COMPLETED_TASKS = 'completed_tasks';

app.get('/api/completed_tasks', async (req, res) => {
	try {
		const tasks = await db(COMPLETED_TASKS).select('*');
		res.status(200).json(tasks);
	} catch (error) {
		console.error('Error obtaining completed tasks:', error);
		res.status(500).json({ error: 'Error obtaining completed tasks' });
	}
});

app.post('/api/completed_tasks', async (req, res) => {
	try {
		const { id, title, description, image, status, assigned, timestamp,} = req.body;
        console.log();
		await db(COMPLETED_TASKS).insert({ id, title, description, image, status, assigned, timestamp, completed_at: new Date() });
		res.status(200).json({ ok: true });
	} catch (error) {
		console.error('Error saving completed tasks:', error);
		res.status(500).json({ error: 'Error saving completed tasks' });
	}
});
