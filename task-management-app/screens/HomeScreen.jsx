import { useMemo } from 'react';
import { Pressable, Text } from 'react-native'
import { ScreenLayout } from './ScreenLayout'
import { useTheme } from '../hooks/useTheme'
import { createStyles } from '../styles/styles'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../store/auth/thunks';

export const HomeScreen = () => {
    const dispatch = useDispatch();
    const {uid, displayName, phoneNumber, email} = useSelector(state => state.auth);

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const onLogout = () => {
        dispatch(startLogout())
        console.log('Logout button pressed')
    }
    return (
        <ScreenLayout>
            <Text style={ styles.text }>Home Screen</Text>
            <Text style={ styles.text }>{uid+' '+ displayName+' '+ phoneNumber+' '+email}</Text>
            <Pressable
                style={ styles.secundaryButton }
                onPress={ onLogout }
            >
                <Text style={ styles.buttonText }>Logout</Text>
            </Pressable>
        </ScreenLayout>
    )
}
