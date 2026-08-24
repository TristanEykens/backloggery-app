import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GameCard from '../components/GameCard';
import EmptyState from '../components/EmptyState';

import { useGames } from '../context/GamesContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';

type PlayingScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export default function PlayingScreen() {
    const navigation =
        useNavigation<PlayingScreenNavigationProp>();

    const { games } = useGames();

    const playingGames = games.filter(
        (game) => game.status === 'Playing'
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Playing
            </Text>

            <Text style={styles.subtitle}>
                Games you are currently playing
            </Text>

            {playingGames.length === 0 ? (
                <EmptyState
                    title="No games here yet"
                    message="Games you mark as Playing will appear here."
                />
            ) : (
                <FlatList
                    data={playingGames}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <GameCard
                            title={item.title}
                            image={item.image}
                            status={item.status}
                            onPress={() =>
                                navigation.navigate(
                                    'GameDetails',
                                    {
                                        gameId: item.id,
                                    }
                                )
                            }
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    initialNumToRender={6}
                    maxToRenderPerBatch={6}
                    windowSize={5}
                    removeClippedSubviews={true}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.md,
    },

    title: {
        color: colors.text,
        fontSize: 32,
        fontWeight: '700',
        marginTop: spacing.md,
        marginBottom: spacing.xs,
    },

    subtitle: {
        color: colors.textSecondary,
        fontSize: 16,
        marginBottom: spacing.lg,
    },

    list: {
        paddingBottom: spacing.xxl,
    },
});