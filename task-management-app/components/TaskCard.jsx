import { Pressable, Text, View } from 'react-native'
import { useTheme } from '../hooks/useTheme';
import { useMemo } from 'react';
import { createCardStyles } from '../styles/taskCardStyle';
import { useRouter } from 'expo-router';

export const TaskCard = ({ title, description, timestamp, id }) => {
    const router = useRouter();

    const { themeColors } = useTheme();
    const cardStyles = useMemo(() => createCardStyles(themeColors), [ themeColors ]);

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }
    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('es-ES', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    }

    const goDetail = () => {
        router.navigate(`/taskDetail?type=view&&id=${id}`)
    }

    return (
        <Pressable style={ cardStyles.container } on onPress={ goDetail }>
            <Text style={ cardStyles.title } >{ title }</Text>
            <Text style={ cardStyles.subtitle } >{ description }</Text>
            <View style={ cardStyles.rowGroup }>
                <Text style={ cardStyles.text } >{ formatDate(timestamp) }</Text>
                <Text style={ cardStyles.text } >{ formatTime(timestamp) }</Text>
            </View>
        </Pressable>
    )
}
