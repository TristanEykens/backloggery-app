import { useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { useGames } from '../context/GamesContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { GameStatus } from '../types/Game';

export default function AddGameScreen() {
    const { addGame } = useGames();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [platform, setPlatform] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [status, setStatus] =
        useState<GameStatus>('Backlog');

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [saving, setSaving] = useState(false);

    async function handleSubmit() {
        setError(null);
        setSuccess(false);

        if (
            !title.trim() ||
            !image.trim() ||
            !description.trim() ||
            !genre.trim() ||
            !platform.trim() ||
            !releaseYear.trim()
        ) {
            setError('Please fill in all fields.');
            return;
        }

        const parsedYear = Number(releaseYear);

        if (
            !Number.isInteger(parsedYear) ||
            parsedYear < 1950 ||
            parsedYear > new Date().getFullYear()
        ) {
            setError(
                `Please enter a valid release year between 1950 and ${new Date().getFullYear()}.`
            );
            return;
        }

        try {
            setSaving(true);

            await addGame({
                title: title.trim(),
                image: image.trim(),
                description: description.trim(),
                genre: genre.trim(),
                platform: platform.trim(),
                releaseYear: parsedYear,
                status,
            });

            setTitle('');
            setImage('');
            setDescription('');
            setGenre('');
            setPlatform('');
            setReleaseYear('');
            setStatus('Backlog');

            setSuccess(true);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : 'Could not add the game.'
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={
                Platform.OS === 'ios'
                    ? 'padding'
                    : undefined
            }
        >
            <ScrollView
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.title}>
                    Add Game
                </Text>

                <Text style={styles.subtitle}>
                    Add a game to your Backloggery collection.
                </Text>

                <View style={styles.form}>
                    <Text style={styles.label}>
                        Title
                    </Text>

                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Game title"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Image URL
                    </Text>

                    <TextInput
                        value={image}
                        onChangeText={setImage}
                        placeholder="https://..."
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        autoCapitalize="none"
                        keyboardType="url"
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Description
                    </Text>

                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Describe the game"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        multiline
                        numberOfLines={4}
                        style={[
                            styles.input,
                            styles.textArea,
                        ]}
                    />

                    <Text style={styles.label}>
                        Genre
                    </Text>

                    <TextInput
                        value={genre}
                        onChangeText={setGenre}
                        placeholder="Adventure"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Platform
                    </Text>

                    <TextInput
                        value={platform}
                        onChangeText={setPlatform}
                        placeholder="Nintendo Switch"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Release Year
                    </Text>

                    <TextInput
                        value={releaseYear}
                        onChangeText={setReleaseYear}
                        placeholder="2025"
                        placeholderTextColor={
                            colors.textSecondary
                        }
                        keyboardType="numeric"
                        style={styles.input}
                    />

                    <Text style={styles.label}>
                        Status
                    </Text>

                    <View style={styles.statusContainer}>
                        {(
                            [
                                'Backlog',
                                'Playing',
                                'Completed',
                                'Dropped',
                            ] as GameStatus[]
                        ).map((gameStatus) => (
                            <Pressable
                                key={gameStatus}
                                onPress={() =>
                                    setStatus(gameStatus)
                                }
                                style={[
                                    styles.statusButton,
                                    status === gameStatus &&
                                    styles.statusButtonActive,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        status === gameStatus &&
                                        styles.statusTextActive,
                                    ]}
                                >
                                    {gameStatus}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {error && (
                        <Text style={styles.error}>
                            {error}
                        </Text>
                    )}

                    {success && (
                        <Text style={styles.success}>
                            Game added successfully!
                        </Text>
                    )}

                    <Pressable
                        onPress={handleSubmit}
                        disabled={saving}
                        style={({ pressed }) => [
                            styles.button,
                            pressed &&
                            styles.buttonPressed,
                            saving &&
                            styles.buttonDisabled,
                        ]}
                    >
                        {saving ? (
                            <ActivityIndicator
                                color={colors.text}
                            />
                        ) : (
                            <Text style={styles.buttonText}>
                                Add Game
                            </Text>
                        )}
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        padding: spacing.md,
        paddingBottom: spacing.xxl,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: '700',
        marginBottom: spacing.xs,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 16,
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

    textArea: {
        minHeight: 110,
        textAlignVertical: 'top',
    },

    statusContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },

    statusButton: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 20,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
    },

    statusButtonActive: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },

    statusText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },

    statusTextActive: {
        color: colors.text,
    },

    error: {
        color: colors.error,
        fontSize: 14,
        marginBottom: spacing.md,
    },

    success: {
        color: colors.success,
        fontSize: 14,
        marginBottom: spacing.md,
    },

    button: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: spacing.sm,
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