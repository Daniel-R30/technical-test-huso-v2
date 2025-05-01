import { uploadTaskPhotoStorage } from '../../firebase/storageProvider';
import { addTaskDB, getTasksDB } from '../../firebase/taskProvider';
import { addTask, checkingTasks, setTasks } from './tasksSlice';

export const startSetTasks = () => {
	return async dispatch => {
		dispatch(checkingTasks());
        const tasks = await getTasksDB();
        dispatch(setTasks(tasks))
	};
};

export const startAddTasks = (task) => {
    return async dispatch => {
        const photoUrl = await uploadTaskPhotoStorage(task.image, task.id)

        task.image = photoUrl;
        await addTaskDB(task);
        dispatch(addTask(task))
    }
}
