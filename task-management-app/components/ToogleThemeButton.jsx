import { Pressable } from 'react-native'
import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from '../assets/Icons';
import { createHeaderStyles } from '../styles/headerStyle';
import { useMemo } from 'react';

export const ToogleThemeButton = () => {
    const { theme, themeColors, toggleTheme } = useTheme();
    const headerStyles = useMemo(() => createHeaderStyles(themeColors), [ themeColors ]);
    
    return (
        <Pressable style={headerStyles.circleButton} onPress={ toggleTheme } >
            {
                theme === 'light' ?
                    <SunIcon color={ themeColors.background } />
                    :
                    <MoonIcon color={ themeColors.background } />
            }
        </Pressable>
    )
}
