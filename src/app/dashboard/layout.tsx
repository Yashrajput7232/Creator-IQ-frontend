'use client';

import { type ReactNode, useEffect } from "react";
import { useRouter } from 'next/navigation';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if loading is complete and there is definitively no user.
    if (!isUserLoading && !user) {
      console.log('Dashboard: No user found after loading, redirecting to login.');
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  // While checking for the user, or if we are about to redirect, show a loading screen.
  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verifying your session...</p>
      </div>
    );
  }

  // If loading is complete and a user exists, render the dashboard.
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
