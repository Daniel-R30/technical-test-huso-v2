import { child, get, ref, remove, set, update } from 'firebase/database';
import { FirebaseDB } from './firebaseConfig';

export const getTasksDB = async () => {
	try {
		const tasksRef = child(ref(FirebaseDB), 'tasks');

		const snapshot = await get(tasksRef);

		if (snapshot.exists()) {
			const tasks = Object.values(snapshot.val());
			return tasks;
		} else {
			return {
				ok: false,
				errorMessage: 'No data available',
			};
		}

	} catch (error) {
		const errorMessage = error.message;
		console.error('Error getting tasks from DB:', errorMessage);
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const addTaskDB = async task => {
	try {
		const taskRef = ref(FirebaseDB, `tasks/${task.id}`);

		await set(taskRef, task);

		return {
			ok: true,
			task: task,
		};

	} catch (error) {
		const errorMessage = error.message;
		console.error('Error adding tasks from DB:', errorMessage);
		return {
			ok: false,
			errorMessage,
		};
	}
};

export const deleteTaskDB = async taskId => {
    try {
        const taskRef = ref(FirebaseDB, `tasks/${taskId}`);
        await remove(taskRef)

        return {
            ok: true
        }
        
    } catch (error) {
        const errorMessage = error.message;
		console.error('Error deleting tasks from DB:', errorMessage);
		return {
			ok: false,
			errorMessage,
		};
    }
}

export const updateTaskStatusDB = async (taskId, newStatus) => {
	try {
		const taskRef = ref(FirebaseDB, `tasks/${taskId}`);

        await update(taskRef, { status: newStatus });

        return {
            ok: true,
        }

	} catch (error) {
		const errorMessage = error.message;
		console.error('Error updating task in DB:', errorMessage);
		return {
			ok: false,
			errorMessage,
		};
	}
};
