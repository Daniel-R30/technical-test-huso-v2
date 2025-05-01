import { AddIco } from '../assets/Icons';
import { createStyles } from '../styles/styles';
import { Pressable } from 'react-native'
import { useMemo } from 'react';
import { useTheme } from '../hooks/useTheme';

export const FloatingButton = ({ action }) => {
    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);

    return (
        <Pressable
            style={ styles.floatingButton }
            onPress={ () => action() }
        >
            <AddIco size={ 32 } color={ themeColors.background } />
        </Pressable>
    )
}
