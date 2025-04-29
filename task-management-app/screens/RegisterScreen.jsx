import { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import { ScreenLayout } from './ScreenLayout'
import { createStyles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme'
import { useForm } from '../hooks/useForm';
import { useRouter } from 'expo-router';
import { startCreatingUserWithEmailPassword } from '../store/auth/thunks';

const initialState = {
    displayName: '',
    email: '',
    password: '',
    phoneNumber: ''
}

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const { displayName, phoneNumber, email, password, onInputChange, onResetForm } = useForm(initialState);
    const [ showPassword, setShowPassword ] = useState(false)

    const { status } = useSelector(state => state.auth);

    const isCheckingAuth = useMemo(() => status === 'checking', [ status ]);

    const onSubmit = () => {
        dispatch(startCreatingUserWithEmailPassword({
            displayName,
            phoneNumber,
            email,
            password,
        }))
        showToast('register button pressed')
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

            <TextInput
                style={ styles.input }
                placeholder='Full Name'
                placeholderTextColor={ themeColors.text }
                value={ displayName }
                onChangeText={ value => onInputChange('displayName', value) }
            />
            <TextInput
                style={ styles.input }
                placeholder='Phone number'
                placeholderTextColor={ themeColors.text }
                value={ phoneNumber }
                onChangeText={ value => onInputChange('phoneNumber', value.replace(/[^0-9]/g, "")) }
                inputMode='numeric'
            />
            <TextInput
                style={ styles.input }
                placeholder='Email'
                placeholderTextColor={ themeColors.text }
                value={ email }
                onChangeText={ value => onInputChange('email', value) }
            />
            <TextInput
                secureTextEntry={ !showPassword }
                style={ styles.input }
                placeholder='Password'
                placeholderTextColor={ themeColors.text }
                value={ password }
                onChangeText={ value => onInputChange('password', value) }
            />

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
