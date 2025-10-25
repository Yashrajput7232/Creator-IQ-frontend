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
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  if (isUserLoading) return <p>Loading...</p>;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <button onClick={handleGoogleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Sign in with Google
      </button>
    </div>
  );
}
