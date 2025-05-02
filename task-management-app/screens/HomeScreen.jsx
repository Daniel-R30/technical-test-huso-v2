import { useEffect, useState } from 'react';
import { ScreenLayout } from './ScreenLayout'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { startSetTasks } from '../store/tasks/thunks';
import { FloatingButton } from '../components/FloatingButton';
import { useRouter } from 'expo-router';
import { SegmentedControl } from '../components/SegmentedControl';
import { startSetCompletedTasks } from '../store/CompletedTask/thunks';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { tasks, status } = useSelector(state => state.tasks);
    const { completedTasks } = useSelector(state => state.completedTasks);

    const [ selectedView, setSelectedView ] = useState('active')

    useEffect(() => {
        dispatch(startSetTasks());
        dispatch(startSetCompletedTasks());
    }, [])

    const floatingButtonAction = () => {
        router.navigate('/taskDetail?type=add')
    }

    return (
        <ScreenLayout>
            <Header title={ 'Task List' }/>
            <SegmentedControl changeView={ view => setSelectedView(view) } />
            <TasksList tasks={ selectedView === 'active' ? tasks : completedTasks }/>
            <FloatingButton action={ floatingButtonAction } />
        </ScreenLayout>
    )
}
