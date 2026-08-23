import { createDrawerNavigator } from '@react-navigation/drawer';
import GameStackNavigator from './GameStackNavigator';
import StatisticsScreen from '../screens/StatisticsScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Games"
                component={GameStackNavigator}
            />
            <Drawer.Screen
                name="Statistics"
                component={StatisticsScreen}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </Drawer.Navigator>
    );
}