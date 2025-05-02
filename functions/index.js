const functions = require('firebase-functions');
const admin = require('firebase-admin');

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
