import { useMemo } from 'react';
import { Text } from 'react-native'
import { ScreenLayout } from './ScreenLayout'
import { useTheme } from '../hooks/useTheme'
import { createStyles } from '../styles/styles'

export const AuthScreen = () => {
    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    return (
        <ScreenLayout>
            <Text style={styles.Text}>Auth Screen</Text>
        </ScreenLayout>
    )
}
