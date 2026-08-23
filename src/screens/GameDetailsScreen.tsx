import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import StatusBadge from '../components/StatusBadge';
import GameStat from '../components/GameStat';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function GameDetailsScreen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe',
                }}
                style={styles.cover}
            />

            <View style={styles.info}>
                <Text style={styles.title}>
                    The Legend of Zelda: Breath of the Wild
                </Text>

                <StatusBadge status="Playing" />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        About
                    </Text>

                    <Text style={styles.description}>
                        Explore a vast open world, discover ancient secrets
                        and embark on an adventure through Hyrule.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>
                        Game Information
                    </Text>

                    <GameStat
                        label="Genre"
                        value="Adventure"
                    />

                    <GameStat
                        label="Platform"
                        value="Nintendo Switch"
                    />

                    <GameStat
                        label="Release Year"
                        value="2017"
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
});