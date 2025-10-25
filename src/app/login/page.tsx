'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorIQLogo, GoogleIcon } from '@/components/icons';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'creator';

  const handleLogin = () => {
    // Simulate a login
    if (role === 'brand') {
      router.push('/dashboard/brand');
    } else {
      router.push('/dashboard/creator');
    }
  };

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
                    onClick={() => router.replace('/login?role=creator')}
                    variant={isCreator ? 'default' : 'ghost'}
                    className={`w-1/2 rounded-r-none ${isCreator ? 'bg-blue-600' : ''}`}
                >
                    Creator
                </Button>
                <Button
                    onClick={() => router.replace('/login?role=brand')}
                    variant={!isCreator ? 'default' : 'ghost'}
                    className={`w-1/2 rounded-l-none ${!isCreator ? 'bg-purple-600' : ''}`}
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
