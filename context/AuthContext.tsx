import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

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

  // Load user info from SecureStore when the app starts
  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await SecureStore.getItemAsync("userInfo");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  // Login: Save user data to SecureStore and context
  const login = (userData: User) => {
    SecureStore.setItemAsync("userInfo", JSON.stringify(userData));
    setUser(userData);
  };

  // Logout: Remove user data from SecureStore and context
  const logout = async () => {
    await SecureStore.deleteItemAsync("userInfo");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
