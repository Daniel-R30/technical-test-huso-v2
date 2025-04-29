import { useMemo } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTheme } from '../hooks/useTheme'
import { createStyles } from '../styles/styles'

export const ScreenLayout = ({ children, props }) => {
    const { theme, themeColors } = useTheme()
    const styles = useMemo(() => createStyles(themeColors), [themeColors])

    return (
        <SafeAreaView style={ styles.container } { ...props }>
            <StatusBar style={ theme === 'light' ? 'dark' : 'light'  }/>
            { children }
        </SafeAreaView>
    )
}
