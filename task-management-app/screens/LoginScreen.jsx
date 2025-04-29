import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, TextInput, ToastAndroid, View } from 'react-native'
import { ScreenLayout } from './ScreenLayout'
import { createStyles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme'
import { useForm } from '../hooks/useForm';
import { useRouter } from 'expo-router';
import { startLoginWithEmailPassword } from '../store/auth/thunks';

const initialState = {
    email: '',
    password: ''
}

export const LoginScreen = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const { email, password, onInputChange, onResetForm } = useForm(initialState);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ formSubmited, setFormSubmited ] = useState(false);

    const { status, errorMessage } = useSelector(state => state.auth);

    const isCheckingAuth = useMemo(() => status === 'checking', [ status ]);

    const onSubmit = () => {
        setFormSubmited(true);
        dispatch(startLoginWithEmailPassword({ email, password }));
    }

    const onRegister = () => {
        router.replace('/register')
    }

    const showToast = (message) => {
        ToastAndroid.show(message, ToastAndroid.LONG);
    };

    useEffect(() => {
        if (errorMessage && formSubmited) {    
            showToast(errorMessage);
        }

        setFormSubmited(false);

    }, [ errorMessage, formSubmited ]);

    return (
        <ScreenLayout>
            <Text style={ styles.title }>Login Screen</Text>

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
                    <Text style={ styles.buttonText }>Login</Text>
                </Pressable>


                <Pressable
                    style={ styles.secundaryButton }
                    onPress={ onRegister }
                    disabled={ isCheckingAuth }
                >
                    <Text style={ styles.buttonText }>Sign Up</Text>
                </Pressable>

            </View>

        </ScreenLayout>
    )
}
