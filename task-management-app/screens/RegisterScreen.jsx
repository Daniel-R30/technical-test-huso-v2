import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import { ScreenLayout } from './ScreenLayout'
import { createStyles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme'
import { useForm } from '../hooks/useForm';
import { useRouter } from 'expo-router';
import { startCreateUserWithEmailPassword } from '../store/auth/thunks';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    phoneNumber: ''
}

const formValidations = {
    displayName: [ (value) => value.length >= 1, 'The name is required' ],
    email: [ (value) => value.includes('@'), 'The email must have @' ],
    password: [ (value) => value.length >= 6, 'The password must be at least 6 characters long' ],
    phoneNumber: [ (value) => value.length >= 10, 'The phone number must be at least 10 characters long' ],
}

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const {
        displayName,
        displayNameValid,
        phoneNumber,
        phoneNumberValid,
        email,
        emailValid,
        password,
        passwordValid,
        onInputChange,
        isFormValid
    } = useForm(initialState, formValidations);

    const [ showPassword, setShowPassword ] = useState(false);
    const [ formSubmited, setFormSubmited ] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuth = useMemo(() => status === 'checking', [ status ]);

    const onSubmit = () => {
        setFormSubmited(true);

        if (!isFormValid) return showToast('Please check the form errors')

        dispatch(startCreateUserWithEmailPassword({
             displayName,
             phoneNumber,
             email,
             password,
         }))
    }

    const onSignUp = () => {
        router.replace('/login')
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    return (
        <ScreenLayout>
            <Text style={ styles.title }>Register Screen</Text>

            <View style={ styles.inputGroup }>
                <TextInput
                    style={ styles.input }
                    placeholder='Full Name'
                    placeholderTextColor={ themeColors.text }
                    value={ displayName }
                    onChangeText={ value => onInputChange('displayName', value) }
                />
                { formSubmited && !!displayNameValid && <Text style={ styles.textError }>{ displayNameValid }</Text> }
            </View>

            <View style={ styles.inputGroup }>
                <TextInput
                    style={ styles.input }
                    placeholder='Phone number'
                    placeholderTextColor={ themeColors.text }
                    value={ phoneNumber }
                    onChangeText={ value => onInputChange('phoneNumber', value.replace(/[^0-9]/g, "")) }
                    inputMode='numeric'
                />
                { formSubmited && !!phoneNumberValid && <Text style={ styles.textError }>{ phoneNumberValid }</Text> }
            </View>

            <View style={ styles.inputGroup }>
                <TextInput
                    style={ styles.input }
                    placeholder='Email'
                    placeholderTextColor={ themeColors.text }
                    value={ email }
                    onChangeText={ value => onInputChange('email', value) }
                />
                { formSubmited && !!emailValid && <Text style={ styles.textError }>{ emailValid }</Text> }
            </View>

            <View style={ styles.inputGroup }>
                <TextInput
                    secureTextEntry={ !showPassword }
                    style={ styles.input }
                    placeholder='Password'
                    placeholderTextColor={ themeColors.text }
                    value={ password }
                    onChangeText={ value => onInputChange('password', value) }
                />
                { formSubmited && !!passwordValid && <Text style={ styles.textError }>{ passwordValid }</Text> }
            </View>

            <View style={ [ styles.columnGroup, styles.alignSelfEnd ] }>
                <Pressable
                    style={ styles.button }
                    onPress={ onSubmit }
                    disabled={ isCheckingAuth }
                >
                    <Text style={ styles.buttonText }>Register</Text>
                </Pressable>

                <Pressable
                    style={ styles.secundaryButton }
                    onPress={ onSignUp }
                    disabled={ isCheckingAuth }
                >
                    <Text style={ styles.buttonText }>Sign in</Text>
                </Pressable>

            </View>

        </ScreenLayout>
    )
}
