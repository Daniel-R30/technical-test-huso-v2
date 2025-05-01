import { useEffect, useMemo, useState } from 'react';
import { ScreenLayout } from './ScreenLayout'
import { useTheme } from '../hooks/useTheme'
import { createStyles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { startSetTasks } from '../store/tasks/thunks';
import { FloatingButton } from '../components/FloatingButton';
import { useRouter } from 'expo-router';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { tasks, status } = useSelector(state => state.tasks);

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    useEffect(() => {
        dispatch(startSetTasks());
    }, [])

    const floatingButtonAction = () => {
        router.navigate('/taskDetail?type=add')
    }

    return (
        <ScreenLayout>
            <Header title={ 'Task List' }/>
            <TasksList tasks={ tasks }/>
            <FloatingButton action={ floatingButtonAction } />
        </ScreenLayout>
    )
}
