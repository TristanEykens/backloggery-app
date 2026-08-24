import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GameCard from '../components/GameCard';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';

import { useGames } from '../context/GamesContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';

type SearchScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export default function SearchScreen() {
    const navigation =
        useNavigation<SearchScreenNavigationProp>();

    const { games } = useGames();

    const [query, setQuery] = useState('');

    const filteredGames = useMemo(() => {
        const searchTerm = query
            .trim()
            .toLowerCase();

        if (!searchTerm) {
            return games;
        }

        return games.filter((game) => {
            return (
                game.title
                    .toLowerCase()
                    .includes(searchTerm) ||
                game.genre
                    .toLowerCase()
                    .includes(searchTerm) ||
                game.platform
                    .toLowerCase()
                    .includes(searchTerm)
            );
        });
    }, [games, query]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Search
            </Text>

            <Text style={styles.subtitle}>
                Find games by title, genre or platform.
            </Text>

            <SearchBar
                value={query}
                onChangeText={setQuery}
            />

            {filteredGames.length === 0 ? (
                <EmptyState
                    title="No games found"
                    message={`No games match "${query}".`}
                />
            ) : (
                <FlatList
                    data={filteredGames}
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
        padding: spacing.md,
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
        marginBottom: spacing.lg,
    },

    list: {
        paddingBottom: spacing.xxl,
    },
});