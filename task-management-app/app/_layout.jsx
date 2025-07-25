import { Stack } from 'expo-router';
import { Provider } from 'react-redux'
import store from '../store/store';

const RootLayout = () => {
    return (
        <Provider store={ store }>
            <Stack
                screenOptions={ {
                    animation: 'fade',
                    headerShown: false,
                    
                } }
            />
        </Provider>
    )
}

export default RootLayout