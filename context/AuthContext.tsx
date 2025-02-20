import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter, useSegments } from "expo-router";

interface User {
  accessToken: string;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments(); // Get current route segments

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("userInfo");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        }
      } catch (error) {
        console.error("Error fetching user session:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (loading) return; // Wait until the user state is set

    const isAuthRoute = segments[0] === "(auth)";

    if (!user && !isAuthRoute) {
      router.replace("/(auth)/login"); // Redirect to login if not authenticated
    } else if (user && isAuthRoute && segments[1] !== "(courier)") {
      router.replace("/(tabs)/home");
    }
  }, [user, loading, segments]);

  const login = async (userData: User) => {
    await SecureStore.setItemAsync("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
