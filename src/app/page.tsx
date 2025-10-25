'use client';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '@/firebase/provider';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && user) {
      console.log('Login page: User found, redirecting to dashboard.');
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.log('Sign-in popup closed by user.');
        return;
      }
      // Handle other errors if necessary
      console.error('An error occurred during sign-in:', error);
    }
  };

  if (isUserLoading || user) {
    // Show a loading indicator while checking auth state or if user is found,
    // to prevent briefly showing the login page before redirect.
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button onClick={handleGoogleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
}
