import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type StatusBadgeProps = {
    status: string;
};

export default function StatusBadge({
                                        status,
                                    }: StatusBadgeProps) {
    return (
        <View style={styles.badge}>
            <Text style={styles.text}>
                {status}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: colors.surfaceLight,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: 20,
    },

    text: {
        color: colors.primaryLight,
        fontSize: 14,
        fontWeight: '600',
    },
});