import { createSlice } from '@reduxjs/toolkit';

export const completeTasksSlice = createSlice({
	name: 'completedTask',
	initialState: {
		status: 'checking',
		completedTasks: [],
	},
	reducers: {
		checkingCompletedTasks: state => {
			state.status = 'checking';
		},
		setCompletedTasks: (state, { payload }) => {
			state.status = 'loaded';
			state.completedTasks = payload;
		},
		cleanCompletedTasks: state => {
			state.completedTasks = [];
		},
		addCompletedTask: (state, { payload }) => {
			state.completedTasks = [...state.completedTasks, payload];
		},
	},
});

export const {
    checkingCompletedTasks,
    setCompletedTasks,
    cleanCompletedTasks,
    addCompletedTask,
} = completeTasksSlice.actions;
