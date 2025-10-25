// This file is now a redirector
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirectPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/dashboard/creator');
  }, [router]);

  return null; // Or a loading spinner
}
