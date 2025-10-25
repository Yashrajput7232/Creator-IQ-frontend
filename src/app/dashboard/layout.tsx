
'use client';

import { type ReactNode } from "react";
import { usePathname } from 'next/navigation';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isBrandDashboard = pathname.startsWith('/dashboard/brand');
  const role = isBrandDashboard ? 'brand' : 'creator';

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
