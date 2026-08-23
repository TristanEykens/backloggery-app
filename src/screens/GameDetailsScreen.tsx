import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import StatusBadge from '../components/StatusBadge';
import GameStat from '../components/GameStat';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';
import { Game } from '../types/Game';
import { getGameById } from '../services/gamesService';

type Props = NativeStackScreenProps<
    RootStackParamList,
    'GameDetails'
>;

export default function GameDetailsScreen({ route }: Props) {
    const { gameId } = route.params;

    const [game, setGame] = useState<Game | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            setError('Could not load game details.');
        } finally {
            setLoading(false);
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

                <StatusBadge status={game.status} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        About
                    </Text>

                    <Text style={styles.description}>
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
                        value={String(game.releaseYear)}
                    />
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