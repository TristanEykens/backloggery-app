import {
    StyleSheet,
    Text,
} from 'react-native';
import Animated, {
    ZoomIn,
} from 'react-native-reanimated';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type StatCardProps = {
    label: string;
    value: number | string;
};

export default function StatCard({
                                     label,
                                     value,
                                 }: StatCardProps) {
    return (
        <Animated.View
            entering={ZoomIn.duration(450)}
            style={styles.card}
        >
            <Text style={styles.value}>
                {value}
            </Text>

            <Text style={styles.label}>
                {label}
            </Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        width: '47%',
        minHeight: 110,
        justifyContent: 'center',
    },

    value: {
        color: colors.primaryLight,
        fontSize: 30,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },

    label: {
        color: colors.textSecondary,
        fontSize: 14,
    },
});