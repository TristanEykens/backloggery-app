import {
    memo,
} from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    FadeInDown,
} from 'react-native-reanimated';

import StatusBadge from './StatusBadge';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type GameCardProps = {
    title: string;
    image: string;
    status: string;
    onPress: () => void;
};

function GameCard({
                      title,
                      image,
                      status,
                      onPress,
                  }: GameCardProps) {
    return (
        <Animated.View
            entering={FadeInDown.duration(400)}
        >
            <Pressable
                onPress={onPress}
                style={({ pressed }) => [
                    styles.card,
                    pressed &&
                    styles.cardPressed,
                ]}
            >
                <View style={styles.imageContainer}>
                    <Animated.Image
                        source={{ uri: image }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.info}>
                    <Text
                        style={styles.title}
                        numberOfLines={2}
                    >
                        {title}
                    </Text>

                    <StatusBadge status={status} />
                </View>
            </Pressable>
        </Animated.View>
    );
}

export default memo(GameCard);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: 12,
        marginBottom: spacing.md,
        overflow: 'hidden',
    },

    cardPressed: {
        opacity: 0.7,
    },

    imageContainer: {
        width: 110,
        height: 140,
    },

    image: {
        width: '100%',
        height: '100%',
    },

    info: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'space-between',
    },

    title: {
        color: colors.text,
        fontSize: 17,
        fontWeight: '600',
        marginBottom: spacing.sm,
    },
});