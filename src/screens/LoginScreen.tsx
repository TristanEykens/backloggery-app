import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function LoginScreen() {
    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        setError(null);

        if (!username.trim() || !password.trim()) {
            setError('Please enter your username and password.');
            return;
        }

        try {
            setLoading(true);

            await login(
                username.trim(),
                password
            );
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Login failed. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <View style={styles.content}>
                <Text style={styles.logo}>
                    Backloggery
                </Text>

                <Text style={styles.title}>
                    Welcome back
                </Text>

                <Text style={styles.subtitle}>
                    Sign in to manage your game backlog.
                </Text>

                <View style={styles.form}>
                    <Text style={styles.label}>
                        Username
                    </Text>

                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Enter your username"
                        placeholderTextColor={colors.textSecondary}
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Password
                    </Text>

                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Enter your password"
                        placeholderTextColor={colors.textSecondary}
                        secureTextEntry
                        autoCapitalize="none"
                        autoCorrect={false}
                        style={styles.input}
                    />

                    {error && (
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    )}

                    <Pressable
                        style={({ pressed }) => [
                            styles.button,
                            pressed && styles.buttonPressed,
                            loading && styles.buttonDisabled,
                        ]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator
                                color={colors.text}
                            />
                        ) : (
                            <Text style={styles.buttonText}>
                                Login
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        padding: spacing.lg,
    },

    logo: {
        color: colors.primaryLight,
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.md,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: spacing.sm,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },

    form: {
        width: '100%',
    },

    label: {
        color: colors.text,
        fontSize: 15,
        fontWeight: '600',
        marginBottom: spacing.xs,
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
        marginBottom: spacing.md,
    },

    error: {
        color: colors.error,
        fontSize: 14,
        marginBottom: spacing.md,
    },

    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        paddingVertical: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 52,
    },

    buttonPressed: {
        opacity: 0.7,
    },

    buttonDisabled: {
        opacity: 0.5,
    },

    buttonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
    },
});