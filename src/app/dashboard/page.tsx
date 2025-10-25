'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  useEffect(() => {
    if (!isUserLoading && user) {
        // Default to creator dashboard if no specific role is determined yet
        router.replace('/dashboard/creator');
    }
  }, [router, user, isUserLoading]);

  // You can show a loading spinner here while the redirect is happening
  return null;
}
