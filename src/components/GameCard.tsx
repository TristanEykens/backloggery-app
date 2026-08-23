import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type GameCardProps = {
    title: string;
    image: string;
    status: string;
    onPress?: () => void;
};

export default function GameCard({
                                     title,
                                     image,
                                     status,
                                     onPress,
                                 }: GameCardProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                styles.card,
                pressed && styles.cardPressed,
            ]}
            onPress={onPress}
        >
            <Image
                source={{ uri: image }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <Text style={styles.status}>
                    {status}
                </Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.md,
    },

    cardPressed: {
        opacity: 0.7,
    },

    image: {
        width: '100%',
        height: 180,
    },

    content: {
        padding: spacing.md,
    },

    title: {
        color: colors.text,
        fontSize: 17,
        fontWeight: '600',
        marginBottom: spacing.xs,
    },

    status: {
        color: colors.primaryLight,
        fontSize: 14,
    },
});