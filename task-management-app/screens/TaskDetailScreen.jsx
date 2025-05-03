import { ScreenLayout } from './ScreenLayout'
import { Header } from '../components/Header'
import { useLocalSearchParams } from 'expo-router';
import { TaskDetail } from '../components/TaskDetail'
import { TaskForm } from '../components/TaskForm';
import { useSelector } from 'react-redux';

export const TaskDetailscreen = () => {
    const { type, id, status } = useLocalSearchParams();

    const title = type === 'add' ? 'Task form' : 'Task detail'

    const selectedTask = status === 'Completed' ?
        useSelector(state => state.completedTasks.completedTasks.find(task => task.id === id))
        :
        useSelector(state => state.tasks.tasks.find(task => task.id === id));

    return (
        <ScreenLayout>
            <Header title={ title } backButton />
            {
                type === 'add' ?
                    <TaskForm />
                    :
                    <TaskDetail task={ selectedTask } />
            }
        </ScreenLayout>
    )
}
