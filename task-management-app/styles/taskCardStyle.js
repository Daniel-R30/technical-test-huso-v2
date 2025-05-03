import { StyleSheet } from 'react-native';

export const createCardStyles = themeColors =>
	StyleSheet.create({
		container: {
			width: '100%',
			flexDirection: 'column',
			backgroundColor: themeColors.primary,
			padding: 16,
			borderRadius: 8,
			gap: 12,
			elevation: 2,
		},
		title: {
			color: themeColors.background,
			fontSize: 20,
			fontWeight: '600',
		},
		subtitle: {
			color: themeColors.background,
			fontSize: 18,
			fontWeight: '400',
		},
		text: {
			color: themeColors.background,
			fontSize: 16,
			fontWeight: 'normal',
		},
		rowGroup: {
			width: '100%',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 16,
		},
	});
