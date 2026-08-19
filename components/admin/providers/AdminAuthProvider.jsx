"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useSyncExternalStore } from "react";
import {
  clearSession,
  getSessionServerSnapshot,
  getSessionSnapshot,
  isSessionReady,
  loginWithCredentials,
  subscribeSession,
} from "@/lib/admin/auth";
import { useHasHydrated } from "@/lib/admin/hydration";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const user = useSyncExternalStore(
    subscribeSession,
    getSessionSnapshot,
    getSessionServerSnapshot,
  );
  const hydrated = useHasHydrated();
  const isReady = hydrated && isSessionReady(user);

  const login = useCallback((email, password) => {
    return loginWithCredentials(email, password);
  }, []);

  const logout = useCallback(() => {
    return clearSession();
  }, []);

  const value = useMemo(
    () => ({ user: user ?? null, isReady, login, logout }),
    [user, isReady, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
