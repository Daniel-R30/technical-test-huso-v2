import { Image, Pressable, Text, ToastAndroid, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useMemo } from 'react';
import { useRouter } from 'expo-router';
import { createStyles } from '../styles/styles';
import { useForm } from '../hooks/useForm';
import { Picker } from '@react-native-picker/picker';
import { startUpdateAssignedTask, startUpdateStatusTask } from '../store/tasks/thunks';
import { startAddCompletedTask } from '../store/CompletedTask/thunks';

const statusItems = [ 'To do', 'In progress', 'Completed' ]
const assignedItems = [ 'Me', 'Other' ]

export const TaskDetail = ({ task }) => {
    const dispatch = useDispatch();
    const router = useRouter()

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const initialState = {
        status: task.status,
        assigned: task.assigned,
    }

    const {
        status,
        assigned,
        onInputChange,
    } = useForm(initialState);

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const onSave = () => {
        if (initialState.assigned === assigned && initialState.status === status) return showToast('You have not modified any data');

        if (initialState.assigned !== assigned) {
            dispatch(startUpdateAssignedTask(task, assigned))
            showToast('The Assigned was changed correctly')
        }

        if (initialState.status !== status && status !== 'Completed') {
            dispatch(startUpdateStatusTask(task, status));
            showToast('The Status was changed correctly')
        }

        if (initialState.status !== status && status === 'Completed'){
            dispatch(startAddCompletedTask({ ...task, assigned, status  }));
            showToast('The task was successfully saved as completed')
            router.replace('/')
        }
    }

    return (
        <>
            <Text style={ styles.subtitle }>{ task.title }</Text>
            <Text style={ styles.text }>{ task.description }</Text>

            <View style={ styles.imageContainer }>
                <Image style={ styles.image } source={ { uri: task.image } } />
            </View>

            <View style={ styles.pickerContainer }>
                <Picker
                    mode='dropdown'
                    selectedValue={ status }
                    onValueChange={ value => onInputChange('status', value) }
                    style={ styles.picker }
                    dropdownIconColor={ themeColors.text }
                >
                    { statusItems.map((value, index) => <Picker.Item style={ styles.pickerItem } label={ value } value={ value } key={ index } />) }
                </Picker>
            </View>

            <View style={ styles.pickerContainer }>
                <Picker
                    mode='dropdown'
                    selectedValue={ assigned }
                    onValueChange={ value => onInputChange('assigned', value) }
                    style={ styles.picker }
                    dropdownIconColor={ themeColors.text }
                >
                    { assignedItems.map((value, index) => <Picker.Item style={ styles.pickerItem } label={ value } value={ value } key={ index } />) }
                </Picker>
            </View>

            {
                task.status !== 'Completed' &&
                <Pressable
                    style={ [ styles.button, styles.alignSelfEnd ] }
                    onPress={ onSave }
                >
                    <Text style={ styles.buttonText }>Save</Text>
                </Pressable>
            }
        </>
    )
}
