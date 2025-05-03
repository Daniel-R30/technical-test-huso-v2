import { uploadTaskPhotoStorage } from '../../firebase/storageProvider';
import {
	addTaskDB,
	getTasksDB,
    deleteTaskDB,
	updateTaskStatusDB,
} from '../../firebase/taskProvider';
import { addTask, checkingTasks, deleteTask, setTasks, updateTask } from './tasksSlice';

export const startSetTasks = () => {
	return async dispatch => {
		dispatch(checkingTasks());
		const tasks = await getTasksDB();
		dispatch(setTasks(tasks));
	};
};

export const startAddTasks = task => {
	return async dispatch => {
		const photoUrl = await uploadTaskPhotoStorage(task.image, task.id);
		task.image = photoUrl;
		await addTaskDB(task);
		dispatch(addTask(task));
	};
};

export const startUpdateStatusTask = (task, newStatus) => {
	return async dispatch => {
		await updateTaskStatusDB(task.id, newStatus);
		dispatch(updateTask({ ...task, status: newStatus }));
	};
};

export const startUpdateAssignedTask = (task, newAssigned) => {
	return async dispatch => {
		await updateAssignedTaskDB(task.id, newAssigned);
		dispatch(updateTask({ ...task, assigned: newAssigned }));
	};
};

export const startDeleteTask = id => {
	return async dispatch => {
		await deleteTaskDB(id)
		dispatch(deleteTask(id));
	};
}

const updateAssignedTaskDB = async (id, value) => {
	const FUNCTION_URL =
		'https://us-central1-huso-todo-app-b3d48.cloudfunctions.net/updateAssigned';

	try {
		const response = await fetch(FUNCTION_URL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				path: `/tasks/${id}`,
				newAssigned: value,
			}),
		});

		const result = await response.text();
		console.log('Server response:', result);
	} catch (err) {
		console.error('Error calling update Assigned:', err);
	}
};
