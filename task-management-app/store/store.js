import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './theme/themeSlice';
import { authSlice } from './auth/authSlice';
import { tasksSlice } from './tasks/tasksSlice';
import { completeTasksSlice } from './CompletedTask/completedTasksSlice';

export default configureStore({
	reducer: {
		theme: themeSlice.reducer,
        auth: authSlice.reducer,
        tasks: tasksSlice.reducer,
        completedTasks:  completeTasksSlice.reducer,
	},
});
