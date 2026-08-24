import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function OfflineBanner() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Offline mode — showing saved games
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surfaceLight,
        borderRadius: 8,
        padding: spacing.sm,
        marginBottom: spacing.md,
    },

    text: {
        color: colors.textSecondary,
        fontSize: 13,
        textAlign: 'center',
    },
});