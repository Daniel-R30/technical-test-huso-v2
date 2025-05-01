import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './theme/themeSlice';
import { authSlice } from './auth/authSlice';
import { tasksSlice } from './tasks/tasksSlice';

export default configureStore({
	reducer: {
		theme: themeSlice.reducer,
        auth: authSlice.reducer,
        tasks: tasksSlice.reducer
	},
});
