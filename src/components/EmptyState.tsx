import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type EmptyStateProps = {
    title: string;
    message: string;
};

export default function EmptyState({
                                       title,
                                       message,
                                   }: EmptyStateProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.message}>
                {message}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.xl,
    },

    title: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: spacing.sm,
        textAlign: 'center',
    },

    message: {
        color: colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
    },
});