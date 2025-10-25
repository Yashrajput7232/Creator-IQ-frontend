'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorIQLogo, GoogleIcon } from '@/components/icons';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!auth || isUserLoading) return;
      try {
        const result = await getRedirectResult(auth);
        if (result && result.user) {
          router.push('/dashboard');
        }
      } catch (error: any) {
        console.error('Error handling redirect result:', error);
        toast({
            title: 'Sign-in Failed',
            description: error.message || 'An unknown error occurred during sign-in.',
            variant: 'destructive',
        });
      }
    };
    handleRedirect();
  }, [auth, router, toast, isUserLoading]);


  const handleSignInWithGoogle = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      toast({
        title: 'Sign-in Error',
        description: 'Could not start the sign-in process. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isUserLoading || user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center justify-center gap-2">
            <CreatorIQLogo />
            <CardTitle className="font-headline text-3xl">CreatorIQ</CardTitle>
          </div>
          <CardDescription>
            Know your worth. Grow your earnings.
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
