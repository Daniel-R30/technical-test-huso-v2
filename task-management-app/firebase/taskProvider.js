import {  child, get, ref, set } from 'firebase/database';
import { FirebaseDB } from './firebaseConfig';

export const getTasksDB = async () => {
	try {
		const tasksRef = child(ref(FirebaseDB),'tasks');

		const snapshot = await get(tasksRef)
		
        if ( snapshot.exists() ) {
			const tasks = Object.values(snapshot.val());
            return tasks

		}else{
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

export const addTaskDB = async (task) => {
    try {
        const taskRef = ref(FirebaseDB, `tasks/${task.id}`);

        await set(taskRef, task);
        
        return {
            ok: true,
            task: task
        }

    } catch (error) {
        const errorMessage = error.message;
		console.error('Error adding tasks from DB:', errorMessage);
		return {
			ok: false,
			errorMessage,
		};
    }
}
