import { Slot } from 'expo-router';
import { Provider } from 'react-redux'
import store from '../store/store';
import { StatusBar } from 'expo-status-bar';

const RootLayout = () => {
    return (
        <Provider store={ store }>
            <Slot />
        </Provider>
    )
}

export default RootLayout