import { createDrawerNavigator } from '@react-navigation/drawer';

import GameStackNavigator from './GameStackNavigator';

import AddGameScreen from '../screens/AddGameScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Games"
                component={GameStackNavigator}
            />

            <Drawer.Screen
                name="Search"
                component={SearchScreen}
            />

            <Drawer.Screen
                name="Statistics"
                component={StatisticsScreen}
            />

            <Drawer.Screen
                name="Add Game"
                component={AddGameScreen}
            />

            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
}