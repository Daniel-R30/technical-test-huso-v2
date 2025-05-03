import { addCompletedTask, setCompletedTasks } from './completedTasksSlice';
import { Platform } from 'react-native';
import axios from 'axios';
import { startDeleteTask } from '../tasks/thunks';

const getBaseUrl = () => {
	if (Platform.OS === 'android') return 'http://10.0.2.2:4000';
	if (Platform.OS === 'ios') return 'http://localhost:4000';
};

const BASE_URL = getBaseUrl();

export const startSetCompletedTasks = () => {
	return async dispatch => {
		try {
			const res = await axios.get(`${BASE_URL}/api/completed_tasks`);
			const tasks = await res.data;
			dispatch(setCompletedTasks(tasks));
		} catch (err) {
			console.error('Error getting Completed Task :', err);
		}
	};
};

export const startAddCompletedTask = task => {
	return async dispatch => {
		try {            
			await axios.post(`${BASE_URL}/api/completed_tasks`,task);
			dispatch(addCompletedTask(task));
            dispatch(startDeleteTask(task.id))
        
		} catch (err) {
			console.error('Error adding Completed Task:', err);
		}
	};
};
