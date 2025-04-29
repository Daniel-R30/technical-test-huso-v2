import { StyleSheet } from 'react-native';

export const createStyles = themeColors =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 24,
			paddingHorizontal: 24,
			backgroundColor: themeColors.background,
			alignItems: 'center',
			gap: 20,
		},
		text: {
			color: themeColors.text,
			fontSize: 24,
			fontWeight: 'bold',
		},
	});
