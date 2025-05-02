import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState: {
		status: 'checking',
		tasks: [],
	},
	reducers: {
		checkingTasks: state => {
			state.status = 'checking';
		},
		setTasks: (state, { payload }) => {
			state.status = 'loaded';
			state.tasks = payload;
		},
		cleanTasks: state => {
			state.tasks = [];
		},
		addTask: (state, { payload }) => {
			state.tasks = [...state.tasks, payload];
		},
		updateTask: (state, { payload }) => {
			state.tasks = state.tasks.map(task =>
				task.id === payload.id ? payload : task
			);
		},
	},
});

export const {
    checkingTasks,
    setTasks,
    cleanTasks,
    addTask,
    updateTask,
    deleteTask,
} = tasksSlice.actions;
