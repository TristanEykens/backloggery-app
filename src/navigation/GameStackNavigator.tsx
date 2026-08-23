import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function GameStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="GameTabs"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="GameDetails"
                component={GameDetailsScreen}
                options={{ title: 'Game Details' }}
            />
        </Stack.Navigator>
    );
}