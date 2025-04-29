import { configureStore } from '@reduxjs/toolkit';
import { themeSlice } from './theme/themeSlice';

export default configureStore({
	reducer: {
		theme: themeSlice.reducer
	},
});
