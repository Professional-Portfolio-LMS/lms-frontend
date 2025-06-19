"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {useRouter} from "next/navigation"
import { jwtDecode } from "jwt-decode";
import { User } from "@/app/(normal)/courses/[courseId]/assignments/[assignmentId]/submissions/page";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

let logoutTimer: NodeJS.Timeout;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      const decodedToken: { exp: number } = jwtDecode(storedToken);
      const now = Date.now() / 1000;

      if (decodedToken.exp > now) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        const expiresInMs = (decodedToken.exp - now) * 1000;

        logoutTimer = setTimeout(() => logout(), expiresInMs);
      } else {
        logout();
      }
    }

    return () => clearTimeout(logoutTimer);
  }, []);

  const login = (token: string) => {
    const decodedUser = jwtDecode<User>(token); // Use jwt-decode properly here
    setUser(decodedUser);
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(decodedUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    document.cookie = "token=; Max-Age=0; path=/";
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login"); 
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
