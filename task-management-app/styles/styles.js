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
		title: {
			color: themeColors.primary,
			fontSize: 24,
			fontWeight: 'bold',
		},
		subtitle: {
			color: themeColors.text,
			fontSize: 20,
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
			padding: 14,
			borderRadius: 8,
			borderColor: themeColors.primary,
			borderWidth: 1,
			backgroundColor: themeColors.backgroundColor,
			color: themeColors.text,
			fontSize: 16,
		},
		inputGroup: {
			width: '100%',
			flexDirection: 'column',
			gap: 4,
		},
		pickerContainer: {
			width: '100%',
			borderRadius: 8,
			borderColor: themeColors.primary,
			borderWidth: 1,
			backgroundColor: themeColors.backgroundColor,
		},
		picker: {
			backgroundColor: themeColors.backgroundColor,
			color: themeColors.text,
			fontSize: 30,
		},
		pickerItem: {
			backgroundColor: themeColors.backgroundColor,
			fontSize: 16,
		},
		button: {
			width: '80%',
			padding: 12,
			borderRadius: 8,
			backgroundColor: themeColors.primary,
			alignItems: 'center',
		},
		buttonText: {
			color: themeColors.background,
			fontSize: 16,
			fontWeight: 'bold',
		},
		buttonTextInactive: {
			color: themeColors.secondary,
			fontSize: 14,
		},
		secundaryButton: {
			width: '80%',
			padding: 12,
			borderRadius: 8,
			backgroundColor: themeColors.secondary,
			alignItems: 'center',
		},
		floatingButton: {
			width: 60,
			height: 60,
			alignItems: 'center',
			justifyContent: 'center',
			position: 'absolute',
			bottom: 16,
			right: 16,
			backgroundColor: themeColors.secondary,
			borderRadius: '100%',
			//elevation: 8,
            elevation: 20,
		},
		columnGroup: {
			flexDirection: 'column',
			alignItems: 'center',
			width: '100%',
			gap: 8,
		},
		rowGroup: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 16,
		},
		alignSelfEnd: {
			alignSelf: 'center',
			marginTop: 'auto',
		},
		imageContainer: {
			width: '100%',
			height: 250,
			alignItems: 'center',
			justifyContent: 'center',
			padding: 14,
			borderRadius: 8,
			borderWidth: 1,
			borderColor: themeColors.primary,
			backgroundColor: themeColors.backgroundColor,
		},
		image: {
			width: '100%',
			height: '100%',
		},
	});
