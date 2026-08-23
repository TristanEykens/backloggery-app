import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type GameStatProps = {
    label: string;
    value: string;
};

export default function GameStat({
                                     label,
                                     value,
                                 }: GameStatProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                {label}
            </Text>

            <Text style={styles.value}>
                {value}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },

    label: {
        color: colors.textSecondary,
        fontSize: 15,
    },

    value: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
    },
});