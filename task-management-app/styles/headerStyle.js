import { StyleSheet } from 'react-native';

export const createHeaderStyles = themeColors =>
	StyleSheet.create({
		container: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		circleButton: {
			width: 35,
			height: 35,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: themeColors.primary,
			borderRadius: '100%',
		},
		circleButtonOutline: {
			width: 35,
			height: 35,
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '100%',
			borderColor: themeColors.primary,
			borderWidth: 2,
		},
	});
