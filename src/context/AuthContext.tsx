import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import * as SecureStore from 'expo-secure-store';

type User = {
    username: string;
};

type AuthContextType = {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

type AuthProviderProps = {
    children: ReactNode;
};

const USER_STORAGE_KEY = 'backloggery_user';

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        restoreSession();
    }, []);

    async function restoreSession() {
        try {
            const storedUser =
                await SecureStore.getItemAsync(USER_STORAGE_KEY);

            if (storedUser) {
                const parsedUser: User = JSON.parse(storedUser);

                setUser(parsedUser);
            }
        } catch (error) {
            console.error('Failed to restore session:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function login(username: string, password: string) {
        if (!username || !password) {
            throw new Error('Username and password are required.');
        }

        // Tijdelijke login voor onze lokale applicatie.
        // Dit vervangen we later eventueel door een echte backend-authenticatie.
        if (username === 'admin' && password === 'password') {
            const loggedInUser: User = {
                username,
            };

            await SecureStore.setItemAsync(
                USER_STORAGE_KEY,
                JSON.stringify(loggedInUser)
            );

            setUser(loggedInUser);

            return;
        }

        throw new Error('Invalid username or password.');
    }

    async function logout() {
        try {
            await SecureStore.deleteItemAsync(USER_STORAGE_KEY);
        } catch (error) {
            console.error('Failed to remove stored session:', error);
        }

        setUser(null);
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: user !== null,
                isLoading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            'useAuth must be used inside an AuthProvider'
        );
    }

    return context;
}