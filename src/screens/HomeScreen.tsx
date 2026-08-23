import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import GameCard from '../components/GameCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { RootStackParamList } from '../types/navigation';

export default function HomeScreen() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Games</Text>

            <Text style={styles.subtitle}>
                Keep track of your video game collection
            </Text>

            <GameCard
                title="The Legend of Zelda: Breath of the Wild"
                image="https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe"
                status="Playing"
                onPress={() => navigation.navigate('GameDetails')}
            />
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
});