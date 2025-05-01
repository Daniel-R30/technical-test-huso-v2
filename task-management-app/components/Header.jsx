import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native'
import { useRouter } from 'expo-router';
import { BackIcon, UserIcon } from '../assets/Icons';
import { useTheme } from '../hooks/useTheme';
import { ToogleThemeButton } from './ToogleThemeButton';
import { createHeaderStyles } from '../styles/headerStyle';
import { createStyles } from '../styles/styles';

export const Header = ({ title, backButton = false }) => {
    const router = useRouter();

    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);
    const headerStyles = useMemo(() => createHeaderStyles(themeColors), [ themeColors ]);

    const goBack = () => {
        router.back()
    }

    const goProfile = () => {
        router.navigate('/profile')
    }

    return (
        <View style={ headerStyles.container }>
            <View style={ styles.rowGroup } >
                { backButton ?
                    <Pressable style={ [ headerStyles.circleButtonOutline, { borderWidth: 0 } ] } onPress={ goBack }>
                        <BackIcon color={ themeColors.primary } />
                    </Pressable>
                    :
                    <Pressable style={ headerStyles.circleButtonOutline } onPress={ goProfile } >
                        <UserIcon color={ themeColors.primary } />
                    </Pressable>
                }
                <Text style={ styles.title }>{ title }</Text>
            </View>

            <ToogleThemeButton />
        </View>
    )
}
