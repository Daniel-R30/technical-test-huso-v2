import { Image, Pressable, Text, ToastAndroid, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useMemo } from 'react';
import { createStyles } from '../styles/styles';
import { useForm } from '../hooks/useForm';
import { Picker } from '@react-native-picker/picker';
import { startUpdateAssignedTask, startUpdateStatusTask } from '../store/tasks/thunks';

const statusItems = [ 'To do', 'In progress', 'Completed' ]
const assignedItems = [ 'Me', 'Other' ]

export const TaskDetail = ({ id }) => {
    const task = useSelector(state => state.tasks.tasks.find(task => task.id === parseInt(id)));

    const dispatch = useDispatch();

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
        if (task.status === 'Completed') return showToast('This task has been completed, you cannot edit it.');

        if (initialState.assigned === assigned && initialState.status === status) return showToast('You have not modified any data');

        if(initialState.assigned !== assigned){
            dispatch(startUpdateAssignedTask(task,assigned))
            showToast('The Assigned was changed correctly')
        }

        if(initialState.status !== status){
            dispatch(startUpdateStatusTask(task,status));
            showToast('The Status was changed correctly')
        }
    }

    return (
        <>
            <Text style={ styles.subtitle }>{ task.title }</Text>
            <Text style={ styles.subtitle }>{ task.description }</Text>

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

            <Pressable
                style={ [ styles.button, styles.alignSelfEnd ] }
                onPress={ onSave }
            >
                <Text style={ styles.buttonText }>Save</Text>
            </Pressable>
        </>
    )
}
