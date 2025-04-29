import { StyleSheet } from 'react-native';
import { colors } from './theme';

export const createStyles = themeColors =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingVertical: 24,
			paddingHorizontal: 24,
			backgroundColor: themeColors.background,
			alignItems: 'center',
			gap: 20,
		},
        title:{
            color: themeColors.primary,
            fontSize: 24,
            fontWeight: 'bold',
        },
		text: {
			color: themeColors.text,
			fontSize: 16,
			fontWeight: 'regular',
		},
        textError: {
			color: colors.red,
			fontSize: 14,
			fontWeight: 'bold',
		},
        input: {
            width: '100%',
            padding: 12,
            borderRadius: 8,
            borderColor: themeColors.primary,
            borderWidth: 1,
            backgroundColor: themeColors.backgroundColor,
            color: themeColors.text,
        },
        inputGroup:{
            width: '100%',
            flexDirection: 'column',
            gap: 4,
        },
        button:{
            width: '80%',
            padding: 12,
            borderRadius: 8,
            backgroundColor: themeColors.primary,
            alignItems: 'center',
        },
        buttonText:{
            color: themeColors.background,
            fontSize: 16,
            fontWeight: 'bold',
        },
        secundaryButton:{
            width: '80%',
            padding: 12,
            borderRadius: 8,
            backgroundColor: themeColors.secondary,
            alignItems: 'center',
        },
        columnGroup:{
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: 8,
        },
        alignSelfEnd:{
            alignSelf: 'end',
            marginTop: 'auto',
        },
	});
