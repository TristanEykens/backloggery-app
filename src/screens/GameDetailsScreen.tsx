import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import StatusBadge from '../components/StatusBadge';
import GameStat from '../components/GameStat';
import { useGames } from '../context/GamesContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';
import { Game, GameStatus } from '../types/Game';
import { getGameById } from '../services/gamesService';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'GameDetails'
>;

const statuses: GameStatus[] = [
    'Backlog',
    'Playing',
    'Completed',
    'Dropped',
];

export default function GameDetailsScreen({
                                              route,
                                              navigation,
                                          }: Props) {
    const { gameId } = route.params;

    const {
        changeGameStatus,
        removeGame,
    } = useGames();

    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [updatingStatus, setUpdatingStatus] =
        useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] =
        useState<string | null>(null);

    useEffect(() => {
        loadGame();
    }, [gameId]);

    async function loadGame() {
        try {
            setLoading(true);
            setError(null);

            const data = await getGameById(gameId);

            setGame(data);
        } catch (error) {
            setError(
                'Could not load game details.'
            );
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(
        status: GameStatus
    ) {
        if (!game || game.status === status) {
            return;
        }

        try {
            setUpdatingStatus(true);

            await changeGameStatus(
                game.id,
                status
            );

            setGame({
                ...game,
                status,
            });
        } catch (error) {
            Alert.alert(
                'Error',
                'Could not update the game status.'
            );
        } finally {
            setUpdatingStatus(false);
        }
    }

    function handleDelete() {
        if (!game) {
            return;
        }

        Alert.alert(
            'Delete Game',
            `Are you sure you want to delete "${game.title}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: deleteGame,
                },
            ]
        );
    }

    async function deleteGame() {
        if (!game) {
            return;
        }

        try {
            setDeleting(true);

            await removeGame(game.id);

            navigation.goBack();
        } catch (error) {
            Alert.alert(
                'Error',
                'Could not delete the game.'
            );
        } finally {
            setDeleting(false);
        }
    }

    async function handleShare() {
        if (!game) {
            return;
        }

        try {
            await Share.share({
                title: game.title,
                message:
                    `Check out ${game.title}!\n\n` +
                    `${game.description}\n\n` +
                    `Platform: ${game.platform}\n` +
                    `Genre: ${game.genre}\n` +
                    `Release year: ${game.releaseYear}\n` +
                    `Status: ${game.status}`,
            });
        } catch (error) {
            Alert.alert(
                'Error',
                'Could not share this game.'
            );
        }
    }

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator
                    size="large"
                    color={colors.primary}
                />

                <Text style={styles.loadingText}>
                    Loading game...
                </Text>
            </View>
        );
    }

    if (error || !game) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>
                    {error ?? 'Game not found.'}
                </Text>
            </View>
        );
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Image
                source={{ uri: game.image }}
                style={styles.cover}
            />

            <View style={styles.info}>
                <Text style={styles.title}>
                    {game.title}
                </Text>

                <StatusBadge
                    status={game.status}
                />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Change Status
                    </Text>

                    <View
                        style={
                            styles.statusContainer
                        }
                    >
                        {statuses.map((status) => (
                            <Pressable
                                key={status}
                                onPress={() =>
                                    handleStatusChange(
                                        status
                                    )
                                }
                                disabled={
                                    updatingStatus
                                }
                                style={({
                                            pressed,
                                        }) => [
                                    styles.statusButton,
                                    game.status ===
                                    status &&
                                    styles.statusButtonActive,
                                    pressed &&
                                    styles.statusButtonPressed,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statusButtonText,
                                        game.status ===
                                        status &&
                                        styles.statusButtonTextActive,
                                    ]}
                                >
                                    {status}
                                </Text>
                            </Pressable>
                        ))}
                    </View>

                    {updatingStatus && (
                        <ActivityIndicator
                            size="small"
                            color={
                                colors.primary
                            }
                            style={
                                styles.statusLoader
                            }
                        />
                    )}
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        About
                    </Text>

                    <Text
                        style={
                            styles.description
                        }
                    >
                        {game.description}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Game Information
                    </Text>

                    <GameStat
                        label="Genre"
                        value={game.genre}
                    />

                    <GameStat
                        label="Platform"
                        value={game.platform}
                    />

                    <GameStat
                        label="Release Year"
                        value={String(
                            game.releaseYear
                        )}
                    />
                </View>

                <View style={styles.actionSection}>
                    <Pressable
                        onPress={handleShare}
                        style={({
                                    pressed,
                                }) => [
                            styles.shareButton,
                            pressed &&
                            styles.buttonPressed,
                        ]}
                    >
                        <Text
                            style={
                                styles.shareButtonText
                            }
                        >
                            Share Game
                        </Text>
                    </Pressable>

                    <Pressable
                        onPress={handleDelete}
                        disabled={deleting}
                        style={({
                                    pressed,
                                }) => [
                            styles.deleteButton,
                            pressed &&
                            styles.buttonPressed,
                            deleting &&
                            styles.deleteButtonDisabled,
                        ]}
                    >
                        {deleting ? (
                            <ActivityIndicator
                                color={
                                    colors.text
                                }
                            />
                        ) : (
                            <Text
                                style={
                                    styles.deleteButtonText
                                }
                            >
                                Delete Game
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    content: {
        paddingBottom: spacing.xxl,
    },

    cover: {
        width: '100%',
        height: 300,
    },

    info: {
        padding: spacing.md,
    },

    title: {
        color: colors.text,
        fontSize: 26,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },

    section: {
        marginTop: spacing.xl,
    },

    sectionTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },

    description: {
        color: colors.textSecondary,
        fontSize: 16,
        lineHeight: 24,
    },

    statusContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
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

    statusButtonPressed: {
        opacity: 0.7,
    },

    statusButtonText: {
        color: colors.textSecondary,
        fontSize: 14,
        fontWeight: '600',
    },

    statusButtonTextActive: {
        color: colors.text,
    },

    statusLoader: {
        marginTop: spacing.md,
    },

    actionSection: {
        marginTop: spacing.xxl,
        gap: spacing.md,
    },

    shareButton: {
        backgroundColor: colors.primary,
        borderRadius: 10,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },

    shareButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
    },

    deleteButton: {
        backgroundColor: colors.error,
        borderRadius: 10,
        minHeight: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },

    deleteButtonDisabled: {
        opacity: 0.5,
    },

    deleteButtonText: {
        color: colors.text,
        fontSize: 16,
        fontWeight: '700',
    },

    buttonPressed: {
        opacity: 0.7,
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.md,
    },

    loadingText: {
        color: colors.textSecondary,
        fontSize: 16,
        marginTop: spacing.md,
    },

    errorText: {
        color: colors.error,
        fontSize: 16,
        textAlign: 'center',
    },
});