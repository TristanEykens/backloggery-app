import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import GameCard from '../components/GameCard';
import LoadingView from '../components/LoadingView';
import OfflineBanner from '../components/OfflineBanner';

import { useGames } from '../context/GamesContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';

type HomeScreenNavigationProp =
    NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
    const navigation =
        useNavigation<HomeScreenNavigationProp>();

    const {
        games,
        loading,
        error,
        isOffline,
        refreshGames,
    } = useGames();

    if (loading) {
        return (
            <LoadingView message="Loading games..." />
        );
    }

    if (error && games.length === 0) {
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
            {isOffline && <OfflineBanner />}

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
                onRefresh={refreshGames}
                refreshing={loading}
                initialNumToRender={6}
                maxToRenderPerBatch={6}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacing.md,
        paddingTop: spacing.md,
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

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: spacing.md,
    },

    errorText: {
        color: colors.error,
        fontSize: 16,
        textAlign: 'center',
    },
});