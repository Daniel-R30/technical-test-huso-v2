import { ScreenLayout } from './ScreenLayout'
import { Header } from '../components/Header'
import { useLocalSearchParams } from 'expo-router';
import { TaskDetail } from '../components/TaskDetail'
import { TaskForm } from '../components/TaskForm';

export const TaskDetailscreen = () => {
    const { type, id } = useLocalSearchParams(); 

    const title = type === 'add' ? 'Task form' : 'Task detail'

    return (
        <ScreenLayout>
            <Header title={ title } backButton />
            {
                type === 'add' ?
                    <TaskForm />
                :
                    <TaskDetail id={ id } />

            }
        </ScreenLayout>
    )
}
