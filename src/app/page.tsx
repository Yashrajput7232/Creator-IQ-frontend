
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorIQLogo, GoogleIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Signing you in...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center gap-2">
            <CreatorIQLogo />
            <CardTitle className="font-headline text-3xl">CreatorIQ</CardTitle>
          </div>
          <CardDescription>
            Sign in to connect your accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleSignInWithGoogle} variant="outline" className="w-full">
              <GoogleIcon className="mr-2 h-5 w-5" />
              Sign in with Google
          </Button>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground mt-4">
        This is a demo application.
      </p>
    </main>
  );
}
