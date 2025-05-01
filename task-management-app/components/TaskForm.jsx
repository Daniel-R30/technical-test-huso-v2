import { useRouter } from 'expo-router';
import { Image, Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { createStyles } from '../styles/styles';
import { useMemo, useState } from 'react';
import { useForm } from '../hooks/useForm';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { AddIco } from '../assets/Icons';
import { startAddTasks } from '../store/tasks/thunks';

const initialState = {
    title: '',
    description: '',
    image: null,
    status: 'To do',
    assigned: 'Me',
}

const formValidations = {
    title: [ (value) => value.length >= 1, 'The title is required' ],
    description: [ (value) => value.length >= 10, 'The description must be at least 10 characters' ],
    image: [ (value) => value !== null, 'The image is required' ],
}

const statusItems = [ 'To do', 'In progress', 'Completed' ]
const assignedItems = [ 'Me', 'Other' ]

export const TaskForm = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const {
        title,
        titleValid,
        description,
        descriptionValid,
        image,
        imageValid,
        status,
        assigned,
        onInputChange,
        isFormValid,
        formState
    } = useForm(initialState, formValidations);

    const [ formSubmited, setFormSubmited ] = useState(false);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: [ 'images' ],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            onInputChange('image', result.assets[0].uri)
        } else {
            showToast('You did not select any image.');
        }
    };

    const onSubmit = () => {
        setFormSubmited(true);

        if (!isFormValid) return showToast('Please check the form errors')

        const task = {
            ...formState,
            id: Date.now()
        }

        dispatch(startAddTasks(task));
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };



    return (
        <>
            <View style={ styles.inputGroup }>
                <TextInput
                    style={ styles.input }
                    placeholder='Title'
                    placeholderTextColor={ themeColors.text }
                    value={ title }
                    onChangeText={ value => onInputChange('title', value) }
                />
                { formSubmited && !!titleValid && <Text style={ styles.textError }>{ titleValid }</Text> }
            </View>

            <View style={ styles.inputGroup }>
                <TextInput
                    style={ styles.input }
                    placeholder='Description'
                    placeholderTextColor={ themeColors.text }
                    value={ description }
                    onChangeText={ value => onInputChange('description', value) }
                />
                { formSubmited && !!descriptionValid && <Text style={ styles.textError }>{ descriptionValid }</Text> }
            </View>

            {/* TODO: This part of the code can be a CustomImagePicker component */} 
            <View style={ styles.inputGroup }>
                <View style={ styles.imageContainer }>
                    {
                        !image ?
                            <Pressable
                                style={ [ styles.button, { backgroundColor: 'transparent' } ] }
                                onPress={ pickImageAsync }
                            >
                                <View style={ styles.columnGroup } >
                                    <AddIco color={ themeColors.text } />
                                    <Text style={ styles.text }>Add image</Text>
                                </View>
                            </Pressable>
                            :
                            <Image style={ styles.image } source={ { uri: image } } />
                    }
                </View>
                { formSubmited && !!imageValid && <Text style={ styles.textError }>{ imageValid }</Text> }
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
                onPress={ onSubmit }
            >
                <Text style={ styles.buttonText }>Submit</Text>
            </Pressable>
        </>
    )
}
