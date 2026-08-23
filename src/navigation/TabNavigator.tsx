import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlayingScreen from '../screens/PlayingScreen';
import BacklogScreen from '../screens/BacklogScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="All Games"
                component={HomeScreen}
            />
            <Tab.Screen
                name="Playing"
                component={PlayingScreen}
            />
            <Tab.Screen
                name="Backlog"
                component={BacklogScreen}
            />
        </Tab.Navigator>
    );
}