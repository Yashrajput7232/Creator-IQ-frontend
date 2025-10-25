'use client';

import React, { createContext, useContext, type ReactNode } from 'react';
import { useUser, type UserState } from './auth/use-user';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';

const FirebaseContext = createContext<UserState | undefined>(undefined);

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const userState = useUser();

  return (
    <FirebaseContext.Provider value={userState}>
      <FirebaseErrorListener />
      {children}
    </FirebaseContext.Provider>
  );
}

export const useAuth = (): UserState => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseClientProvider');
  }
  return context;
};
