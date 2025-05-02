import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../hooks/useTheme';
import { ScreenLayout } from './ScreenLayout';
import { Header } from '../components/Header';
import { Pressable, Text } from 'react-native';
import { createStyles } from '../styles/styles';
import { startLogout } from '../store/auth/thunks';
import { cleanTasks } from '../store/tasks/tasksSlice';

export const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { uid, displayName, phoneNumber, email } = useSelector(state => state.auth);

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    const onLogout = () => {
        dispatch(startLogout())
        dispatch(cleanTasks())
    }
    return (
        <ScreenLayout>
            <Header title={ 'Profile' } backButton />
            <Text style={ styles.subtitle }>{ displayName }</Text>
            <Text style={ styles.subtitle }>{ phoneNumber }</Text>
            <Text style={ styles.subtitle }>{ email }</Text>
            <Text style={ styles.subtitle }>{ uid }</Text>
            <Pressable
                style={ [ styles.button, styles.alignSelfEnd ] }
                onPress={ onLogout }
            >
                <Text style={ styles.buttonText }>Logout</Text>
            </Pressable>
        </ScreenLayout>
    )
}
