import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: colorScheme || 'light',
    },
    reducers: {
        toggleTheme: state => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { toggleTheme, setTheme } = themeSlice.actions;