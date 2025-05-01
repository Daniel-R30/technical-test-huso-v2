import { Text, View } from 'react-native'

export const TaskDetail = ({ id }) => {
    return (
        <View>
            <Text>{ 'Task Detail ' + id }</Text>
        </View>
    )
}
