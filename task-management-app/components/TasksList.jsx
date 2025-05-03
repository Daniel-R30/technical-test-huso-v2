import { FlatList, Text } from 'react-native'
import { TaskCard } from './TaskCard'
import { useTheme } from '../hooks/useTheme';
import { createStyles } from '../styles/styles';
import { useMemo } from 'react';

export const TasksList = ({ tasks }) => { 
    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);
        
    return (
        <FlatList
            data={ tasks }
            keyExtractor={ item => item.id }
            renderItem={ ( { item: task } ) =>  <TaskCard title={ task.title } description={ task.description } timestamp={ task.timestamp } id={ task.id } status={ task.status } /> }
            contentContainerStyle={ { gap: 12, padding: 8 } }
            showsVerticalScrollIndicator={ false }
            ListEmptyComponent={ <Text style={styles.text} >This list is empty</Text>}
        />
    )
}
