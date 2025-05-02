import { setCompletedTasks } from './completedTasksSlice'

const getCompletedTaskUrl = 'http://localhost:5001/huso-todo-app-b3d48/us-central1/getCompletedTasks'

export const startSetCompletedTasks = () => {
	return async dispatch => {
        try {
            const res = await fetch(getCompletedTaskUrl);
            const tasks = res.json()
            dispatch(setCompletedTasks(tasks))
        } catch (err) {
            console.error("Error getting Task Completed:", err);
        }
	};
};
