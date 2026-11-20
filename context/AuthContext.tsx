"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: "Agency Director" | "Content Creator";
  tier: string;
  avatarUrl: string;
  scheduledPostsCount: number;
  connectedNetworksCount: number;
}

interface AuthContextType {
  user: UserSession | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string, role?: "Agency Director" | "Content Creator") => void;
  logout: () => void;
  switchRole: () => void;
}

const DEMO_DIRECTOR: UserSession = {
  id: "usr_soc_881",
  name: "Chloe Bennett",
  email: "chloe.b@omnisocial.io",
  role: "Agency Director",
  tier: "Enterprise Multi-Network",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  scheduledPostsCount: 18,
  connectedNetworksCount: 5,
};

const DEMO_CREATOR: UserSession = {
  id: "usr_soc_004",
  name: "Liam Vance",
  email: "liam.v@omnisocial.io",
  role: "Content Creator",
  tier: "Creator Pro Suite",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  scheduledPostsCount: 5,
  connectedNetworksCount: 2,
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  switchRole: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserSession | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("omnisocial_auth_session");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch {
        setUser(DEMO_DIRECTOR);
      }
    } else {
      setUser(DEMO_DIRECTOR);
    }
  }, []);

  const login = (email: string, name?: string, role: "Agency Director" | "Content Creator" = "Agency Director") => {
    const newUser: UserSession = {
      id: `usr_${Date.now()}`,
      name: name || email.split("@")[0],
      email,
      role,
      tier: role === "Agency Director" ? "Enterprise Multi-Network" : "Creator Starter",
      avatarUrl: DEMO_DIRECTOR.avatarUrl,
      scheduledPostsCount: 2,
      connectedNetworksCount: 1,
    };
    setUser(newUser);
    localStorage.setItem("omnisocial_auth_session", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("omnisocial_auth_session");
  };

  const switchRole = () => {
    setUser((prev) => {
      const next = prev?.role === "Content Creator" ? DEMO_DIRECTOR : DEMO_CREATOR;
      localStorage.setItem("omnisocial_auth_session", JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
