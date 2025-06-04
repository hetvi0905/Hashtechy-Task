"use client";
import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = () => {
    const email = localStorage.getItem("userEmail");
    setIsLoggedIn(!!email);
    setIsLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userEmail") {
        checkAuthStatus();
      }
    };

    // Listen for custom auth events
    const handleAuthChange = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const login = (email: string) => {
    localStorage.setItem("userEmail", email);
    localStorage.setItem("loginTimestamp", new Date().toISOString());
    setIsLoggedIn(true);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("authChange"));
  };

  const logout = () => {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("loginPassword");
    localStorage.removeItem("loginTimestamp");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
  };

  return { isLoggedIn, isLoading, login, logout, checkAuthStatus };
}
