import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Theme = 'light' | 'dark';

type AppState = {
  likes: number[];
  passed: number[];
  joined: number[];
  saved: number[];
  theme: Theme;
};

type AppActions = {
  like: (id: number) => void;
  pass: (id: number) => void;
  join: (id: number) => void;
  unlike: (id: number) => void;
  leave: (id: number) => void;
  save: (id: number) => void;
  unsave: (id: number) => void;
  clearSaved: () => void;
  deferSaved: (id: number) => void;
  toggleTheme: () => void;
  resetAll: () => void;
  resetLikes: () => void;
  resetJoined: () => void;
};

const DEFAULT_STATE: AppState = {
  likes: [],
  passed: [],
  joined: [],
  saved: [],
  theme: 'light',
};

const STORAGE_KEY = 'planit-app-state-v1';

const AppStoreCtx = createContext<(AppState & AppActions) | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  // load persisted
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<AppState>;
          setState({ ...DEFAULT_STATE, ...parsed });
        }
      } catch {}
      setLoaded(true);
    })();
  }, []);

  // persist on change (after loaded)
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, loaded]);

  const actions: AppActions = useMemo(() => ({
    like: (id) => setState((s) => (s.likes.includes(id) ? s : { ...s, likes: [...s.likes, id] })),
    unlike: (id) => setState((s) => ({ ...s, likes: s.likes.filter((x) => x !== id) })),
    pass: (id) => setState((s) => (s.passed.includes(id) ? s : { ...s, passed: [...s.passed, id] })),
    join: (id) => setState((s) => ({ ...s, joined: s.joined.includes(id) ? s.joined : [...s.joined, id], likes: s.likes.includes(id) ? s.likes : [...s.likes, id] })),
    leave: (id) => setState((s) => ({ ...s, joined: s.joined.filter((x) => x !== id) })),
    save: (id) => setState((s) => (s.saved.includes(id) ? s : { ...s, saved: [...s.saved, id] })),
    unsave: (id) => setState((s) => ({ ...s, saved: s.saved.filter((x) => x !== id) })),
    clearSaved: () => setState((s) => ({ ...s, saved: [] })),
    deferSaved: (id) => setState((s) => {
      if (!s.saved.includes(id)) return s;
      const rest = s.saved.filter((x) => x !== id);
      return { ...s, saved: [...rest, id] };
    }),
    toggleTheme: () => setState((s) => ({ ...s, theme: s.theme === 'dark' ? 'light' : 'dark' })),
    resetAll: () => setState((s) => ({ ...s, likes: [], passed: [], joined: [], saved: [] })),
    resetLikes: () => setState((s) => ({ ...s, likes: [] })),
    resetJoined: () => setState((s) => ({ ...s, joined: [] })),
  }), []);

  const value = { ...state, ...actions };

  return <AppStoreCtx.Provider value={value}>{children}</AppStoreCtx.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreCtx);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
