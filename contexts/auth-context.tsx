"use client";
import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on component mount
    const savedEmail = localStorage.getItem("userEmail");
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (savedEmail && loginTimestamp) {
      setIsLoggedIn(true);
      setUserEmail(savedEmail);
    }
  }, []);

  const login = (email: string) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loginTimestamp", new Date().toISOString());
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginTimestamp");
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("loginPassword");
    setIsLoggedIn(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
