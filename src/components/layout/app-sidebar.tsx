'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BotMessageSquare,
  DollarSign,
  Gauge,
  Handshake,
  Settings,
  CircleHelp,
} from 'lucide-react';
import { CreatorIQLogo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/content-insights', icon: BotMessageSquare, label: 'Content Insights' },
  { href: '/dashboard/valuation', icon: DollarSign, label: 'Valuation' },
  { href: '/dashboard/brand-readiness', icon: Gauge, label: 'Brand Readiness' },
  { href: '/dashboard/deals', icon: Handshake, label: 'Deal Tracker' },
];

const bottomNavItems = [
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { href: '#', icon: CircleHelp, label: 'Help' },
]

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <CreatorIQLogo />
            <span className="font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden">CreatorIQ</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2">
         <Separator className="my-2" />
         <SidebarMenu>
            {bottomNavItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href} legacyBehavior passHref>
                        <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                        >
                        <item.icon />
                        <span>{item.label}</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            ))}
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
