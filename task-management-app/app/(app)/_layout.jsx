import { Redirect, Stack } from 'expo-router'
import { useCheckAuth } from '../../hooks/useCheckAuth';

const AppLayout = () => {
    const status = useCheckAuth();

    if (status !== 'authenticated') {
        return <Redirect href='/login' />;
    }

    return (
        <Stack
            screenOptions={ {
                animation: 'fade',
                headerShown: false,
            } }
        />
    )
}

export default AppLayout