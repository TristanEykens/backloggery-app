import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { GamesProvider } from './src/context/GamesContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <GamesProvider>
                    <RootNavigator />
                </GamesProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
}