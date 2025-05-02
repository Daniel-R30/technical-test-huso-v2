import { Pressable, Text } from 'react-native'
import { useTheme } from '../hooks/useTheme';
import { useEffect, useMemo, useState } from 'react';
import { createStyles } from '../styles/styles';
import { createSegmentedControlStyles } from '../styles/segmentedControlStyle';

export const Button = ({ text, action, style = 'regular' }) => {
    const { themeColors } = useTheme();
    const styles = useMemo(() => createStyles(themeColors), [ themeColors ]);
    const segmentedControlStyles = useMemo(() => createSegmentedControlStyles(themeColors), [ themeColors ]);

    const [ buttonStyle, setButtonStyle ] = useState({})
    const [ textStyle, setTextStyle ] = useState({})

    useEffect(() => {
        switch (style) {
            case 'regular':
                setButtonStyle(styles.button)
                setTextStyle(styles.buttonText)
                break;

            case 'segmented':
                setButtonStyle(segmentedControlStyles.segmentedButton)
                setTextStyle(styles.buttonText)
                break;

            case 'segmentedInactive':
                setButtonStyle(segmentedControlStyles.segmentedButtonInactive)
                setTextStyle(styles.buttonTextInactive)
                break;
        }
    }, [ style, themeColors ])

    return (
        <Pressable
            style={ buttonStyle }
            onPress={ action }
        >
            <Text style={ textStyle }>{ text }</Text>
        </Pressable>
    )
}
