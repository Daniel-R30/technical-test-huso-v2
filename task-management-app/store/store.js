import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './theme/themeSlice';
import { authSlice } from './auth/authSlice';

export default configureStore({
	reducer: {
		theme: themeSlice.reducer,
        auth: authSlice.reducer,
	},
});
