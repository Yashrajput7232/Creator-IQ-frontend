'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorIQLogo, GoogleIcon } from '@/components/icons';
import { motion } from 'framer-motion';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { useToast } from '@/hooks/use-toast';
import { useUser } from '@/firebase';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const role = searchParams.get('role') || 'creator';

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
        if (error.code === 'auth/popup-closed-by-user') {
            console.log("Sign-in popup closed by user.");
            return;
        }
        console.error("Firebase login error:", error);
        toast({
            title: "Login Failed",
            description: "Could not sign in with Google. Please try again.",
            variant: "destructive",
        });
    }
  };

  useEffect(() => {
    if (!isUserLoading && user) {
      const targetDashboard = role === 'brand' ? '/dashboard/brand' : '/dashboard/creator';
      router.replace(targetDashboard);
    }
  }, [user, isUserLoading, role, router]);


  const isCreator = role === 'creator';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center gap-2">
              <CreatorIQLogo className="h-8 w-8" />
              <span className="font-headline text-2xl font-semibold">CreatorIQ</span>
            </div>
            <CardTitle className="font-headline text-xl">
              Welcome {isCreator ? 'Creator' : 'Brand'}!
            </CardTitle>
            <CardDescription>Sign in to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex w-full">
                <Button
                    onClick={() => router.push('/login?role=creator')}
                    variant={isCreator ? 'default' : 'ghost'}
                    className={`w-1/2 rounded-r-none ${isCreator ? 'data-[active=true]:bg-primary' : ''}`}
                >
                    Creator
                </Button>
                <Button
                    onClick={() => router.push('/login?role=brand')}
                    variant={!isCreator ? 'default' : 'ghost'}
                    className={`w-1/2 rounded-l-none ${!isCreator ? 'bg-secondary' : ''}`}
                >
                    Brand
                </Button>
            </div>
            <Button onClick={handleLogin} className="w-full" variant="outline">
              <GoogleIcon className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
