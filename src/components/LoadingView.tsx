import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type LoadingViewProps = {
    message?: string;
};

export default function LoadingView({
                                        message = 'Loading...',
                                    }: LoadingViewProps) {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size="large"
                color={colors.primary}
            />

            <Text style={styles.text}>
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
        backgroundColor: colors.background,
        padding: spacing.md,
    },

    text: {
        color: colors.textSecondary,
        fontSize: 16,
        marginTop: spacing.md,
    },
});