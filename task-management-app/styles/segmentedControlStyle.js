import { StyleSheet } from 'react-native';

export const createSegmentedControlStyles = themeColors =>
    StyleSheet.create({
        container: {
            width: '100%',
            padding: 4,
            flexDirection: 'row',
            borderRadius: 30,
            borderColor: themeColors.primary,
            borderWidth: 2
        },
        segmentedButton: {
            width: '50%',
			padding: 8,
			borderRadius: 30,
			backgroundColor: themeColors.primary,
			alignItems: 'center',
        },
        segmentedButtonInactive: {
            width: '50%',
			padding: 8,
            borderRadius: 30,
			backgroundColor: themeColors.background,
			alignItems: 'center',
        }
    });