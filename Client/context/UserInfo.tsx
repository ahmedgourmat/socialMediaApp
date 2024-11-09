import { useEffect, useState, createContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface UserContextType {
  token: string | null;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Create a context with default values
export const UserInfo = createContext<UserContextType | null>(null);

interface UserContextProps {
  children: ReactNode;
}

export function UserContext({ children }: UserContextProps) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [notiaction , setNotification] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch token and user info from AsyncStorage on initial render
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const tokenInfo = await SecureStore.getItemAsync('token')
        const userInfo = await SecureStore.getItemAsync('user')
        setToken(tokenInfo);
        setUser(userInfo ? JSON.parse(userInfo) : null);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) {
    return null; // Or you can return a loading spinner or skeleton
  }

  return (
    <UserInfo.Provider value={{ token, user, setUser }}>
      {children}
    </UserInfo.Provider>
  );
}
