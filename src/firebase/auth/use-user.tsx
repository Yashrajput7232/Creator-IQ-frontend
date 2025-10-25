
'use client';
import { useEffect, useState } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';

export interface UserHookResult {
  user: User | null;
  isUserLoading: boolean;
  userError: Error | null;
}

export const useUser = (): UserHookResult => {
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [userError, setUserError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth) {
      console.log('Auth service not available in useUser hook.');
      setIsUserLoading(false);
      setUserError(new Error("Auth service not available."));
      return;
    }

    console.log('Setting up auth state listener.');
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          console.log('Auth state changed: User is signed in.', firebaseUser.uid);
          setUser(firebaseUser);
        } else {
          console.log('Auth state changed: User is signed out.');
          setUser(null);
        }
        setIsUserLoading(false);
      },
      (error) => {
        console.error('Auth state listener error:', error);
        setUserError(error);
        setIsUserLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth state listener.');
      unsubscribe();
    };
  }, [auth]);

  return { user, isUserLoading, userError };
};
