import {
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import StatCard from '../components/StatCard';
import { useGames } from '../context/GamesContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function StatisticsScreen() {
    const { games } = useGames();

    const totalGames = games.length;

    const playingGames = games.filter(
        (game) => game.status === 'Playing'
    ).length;

    const backlogGames = games.filter(
        (game) => game.status === 'Backlog'
    ).length;

    const completedGames = games.filter(
        (game) => game.status === 'Completed'
    ).length;

    const droppedGames = games.filter(
        (game) => game.status === 'Dropped'
    ).length;

    const completionRate =
        totalGames > 0
            ? Math.round(
                (completedGames / totalGames) * 100
            )
            : 0;

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.title}>
                Statistics
            </Text>

            <Text style={styles.subtitle}>
                An overview of your gaming backlog.
            </Text>

            <View style={styles.grid}>
                <StatCard
                    label="Total Games"
                    value={totalGames}
                />

                <StatCard
                    label="Playing"
                    value={playingGames}
                />

                <StatCard
                    label="Backlog"
                    value={backlogGames}
                />

                <StatCard
                    label="Completed"
                    value={completedGames}
                />

                <StatCard
                    label="Dropped"
                    value={droppedGames}
                />

                <StatCard
                    label="Completion"
                    value={`${completionRate}%`}
                />
            </View>

            <View style={styles.summary}>
                <Text style={styles.summaryTitle}>
                    Your Backlog
                </Text>

                <Text style={styles.summaryText}>
                    {backlogGames === 0
                        ? 'Your backlog is empty. Time to add some games!'
                        : `You have ${backlogGames} game${
                            backlogGames === 1
                                ? ''
                                : 's'
                        } waiting to be played.`}
                </Text>
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

    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },

    summary: {
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacing.md,
        marginTop: spacing.xl,
    },

    summaryTitle: {
        color: colors.text,
        fontSize: 20,
        fontWeight: '700',
        marginBottom: spacing.sm,
    },

    summaryText: {
        color: colors.textSecondary,
        fontSize: 16,
        lineHeight: 24,
    },
});