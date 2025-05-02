import { useMemo, useState } from 'react'
import { Button } from './Button';
import { useTheme } from '../hooks/useTheme';
import { View } from 'react-native';
import { createSegmentedControlStyles } from '../styles/segmentedControlStyle';

export const SegmentedControl = ({ changeView }) => {
    const { themeColors } = useTheme();
    const styles = useMemo(() => createSegmentedControlStyles(themeColors), [ themeColors ]);

    const [ selectedIndex, setSelectedIndex ] = useState('active')

    const changeIndex = (index) => {
        setSelectedIndex(index)
        changeView(index)
    }

    return (
        <View style={ styles.container }>
            <Button style={ selectedIndex === 'active' ? 'segmented' : 'segmentedInactive' } text='Active Tasks' action={ () => changeIndex('active') } />
            <Button style={ selectedIndex === 'completed' ? 'segmented' : 'segmentedInactive' } text='Completed Tasks' action={ () => changeIndex('completed') } />
        </View>
    )
}
