import { FlatList } from 'react-native'
import { TaskCard } from './TaskCard'

export const TasksList = ({ tasks }) => { 
    return (
        <FlatList
            data={ tasks }
            renderItem={ ( { item: task } ) =>  <TaskCard title={ task.title } description={ task.description } timestamp={ task.timestamp } id={ task.id } key={ task.id } /> }
            contentContainerStyle={ { gap: 8 } }
            showsVerticalScrollIndicator={ false }
        />
    )
}
