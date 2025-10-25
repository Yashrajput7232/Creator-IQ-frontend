
'use client';

import { type ReactNode, useEffect } from "react";
import { usePathname, useRouter } from 'next/navigation';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { useUser } from '@/firebase';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const isBrandDashboard = pathname.startsWith('/dashboard/brand');
  const role = isBrandDashboard ? 'brand' : 'creator';

  useEffect(() => {
    // If loading is finished and there's no user, redirect to login
    if (!isUserLoading && !user) {
      const loginPath = role === 'brand' ? '/login?role=brand' : '/login?role=creator';
      router.replace(loginPath);
    }
  }, [user, isUserLoading, router, role]);

  if (isUserLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <Header role={role} />
        <main className="p-4 md:p-6 lg:p-8 bg-muted/40 min-h-screen">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
