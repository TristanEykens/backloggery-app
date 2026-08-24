import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type SearchBarProps = {
    value: string;
    onChangeText: (text: string) => void;
};

export default function SearchBar({
                                      value,
                                      onChangeText,
                                  }: SearchBarProps) {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Search games..."
                placeholderTextColor={
                    colors.textSecondary
                }
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.md,
    },

    input: {
        backgroundColor: colors.surface,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        fontSize: 16,
    },
});