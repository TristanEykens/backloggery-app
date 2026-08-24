import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function SettingsScreen() {
    const { user, logout } = useAuth();

    function handleLogout() {
        Alert.alert(
            'Logout',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        await logout();
                    },
                },
            ]
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Settings
            </Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    Account
                </Text>

                <Text style={styles.username}>
                    Logged in as {user?.username}
                </Text>
            </View>

            <Pressable
                style={({ pressed }) => [
                    styles.logoutButton,
                    pressed && styles.buttonPressed,
                ]}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>
                    Log Out
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.md,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: '700',
        marginBottom: spacing.xl,
    },

    section: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.xl,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },

    username: {
        color: colors.textSecondary,
        fontSize: 16,
    },

    logoutButton: {
        backgroundColor: colors.error,
        borderRadius: 10,
        paddingVertical: spacing.md,
        alignItems: 'center',
    },

    buttonPressed: {
        opacity: 0.7,
    },

    logoutText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
    },
});