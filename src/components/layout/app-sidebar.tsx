
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
  Users,
  Search,
  Briefcase,
} from 'lucide-react';
import { CreatorIQLogo } from '@/components/icons';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Separator } from '../ui/separator';

const creatorNavItems = [
  { href: '/dashboard/creator', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/content-insights', icon: BotMessageSquare, label: 'Content Insights' },
  { href: '/dashboard/valuation', icon: DollarSign, label: 'Valuation' },
  { href: '/dashboard/brand-readiness', icon: Gauge, label: 'Brand Readiness' },
  { href: '/dashboard/deals', icon: Handshake, label: 'Deal Tracker' },
  { href: '/dashboard/competitors', icon: Users, label: 'Find Competitors' },
];

const brandNavItems = [
    { href: '/dashboard/brand', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/brand/discover', icon: Search, label: 'Discover Creators' },
    { href: '/dashboard/brand/campaigns', icon: Briefcase, label: 'Campaign Tracker' },
];

const bottomNavItems = [
    { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
    { href: '#', icon: CircleHelp, label: 'Help' },
]

export default function AppSidebar({ role }: { role: 'creator' | 'brand' }) {
  const pathname = usePathname();
  const navItems = role === 'creator' ? creatorNavItems : brandNavItems;
  const dashboardHome = role === 'creator' ? '/dashboard/creator' : '/dashboard/brand';

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href={dashboardHome} className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <CreatorIQLogo />
            <span className="font-headline text-xl font-semibold group-data-[collapsible=icon]:hidden">CreatorIQ</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  className={role === 'brand' ? 'data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground' : ''}
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
                    <Link href={item.href} passHref>
                        <SidebarMenuButton
                        isActive={pathname === item.href}
                        tooltip={item.label}
                        className={role === 'brand' ? 'data-[active=true]:bg-secondary data-[active=true]:text-secondary-foreground' : ''}
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
