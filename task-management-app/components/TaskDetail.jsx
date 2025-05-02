import { Image, Pressable, Text, ToastAndroid, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useMemo } from 'react';
import { createStyles } from '../styles/styles';
import { useForm } from '../hooks/useForm';
import { Picker } from '@react-native-picker/picker';
import { updateTask } from '../store/tasks/tasksSlice';

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
        isFormValid,
        formState,
        onResetForm
    } = useForm(initialState);

    const updateAssigned = async (id, value) => {
        const FUNCTION_URL = 'https://us-central1-huso-todo-app-b3d48.cloudfunctions.net/updateAssigned';

        try {
            const response = await fetch(FUNCTION_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path: `/tasks/${ id }`,
                    newAssigned: value
                }),
            });

            const result = await response.text();
            console.log("Respuesta del servidor:", result);
        } catch (err) {
            console.error("Error al llamar a updateResponsible:", err);
        }
    };

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    const onSave = () => {
        if (initialState.assigned === assigned && initialState.status === status) return showToast('You have not modified any data');

        if(initialState.assigned !== assigned){
            updateAssigned(task.id, assigned);
            dispatch(updateTask({ ...task, assigned: assigned }))
            showToast('The Assigned was changed correctly')
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
