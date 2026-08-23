import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GameCard from '../components/GameCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { Game } from '../types/Game';
import { RootStackParamList } from '../types/navigation';
import { getGames } from '../services/gamesService';

type HomeScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadGames();
    }, []);

    async function loadGames() {
        try {
            setLoading(true);
            setError(null);

            const data = await getGames();

            setGames(data);
        } catch (error) {
            setError('Could not load games. Please try again.');
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
                    Loading games...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>
                    {error}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                My Games
            </Text>

            <Text style={styles.subtitle}>
                Keep track of your video game collection
            </Text>

            <FlatList
                data={games}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <GameCard
                        title={item.title}
                        image={item.image}
                        status={item.status}
                        onPress={() =>
                            navigation.navigate('GameDetails', {
                                gameId: item.id,
                            })
                        }
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
            />
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