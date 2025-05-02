import { Image, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { useMemo } from 'react';
import { createStyles } from '../styles/styles';
import { useForm } from '../hooks/useForm';
import { Picker } from '@react-native-picker/picker';

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
        </>
    )
}
