
'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Bell } from 'lucide-react';
import { useUser } from '@/firebase';
import { auth } from '@/firebase/client';
import { signOut } from 'firebase/auth';


const pageTitles: { [key: string]: string } = {
  '/dashboard/creator': 'Creator Dashboard',
  '/dashboard/content-insights': 'Content Insights',
  '/dashboard/valuation': 'Creator Valuation',
  '/dashboard/brand-readiness': 'Brand Readiness',
  '/dashboard/deals': 'Deal Tracker',
  '/dashboard/competitors': 'Find Competitors',
  '/dashboard/brand': 'Brand Dashboard',
  '/dashboard/brand/discover': 'Discover Creators',
  '/dashboard/brand/campaigns': 'Campaign Tracker',
  '/dashboard/settings': 'Settings',
};

const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`;
    }
    return name[0];
}

export default function Header({ role }: { role: 'creator' | 'brand' }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const displayName = user?.displayName || (role === 'creator' ? 'Creator' : 'Brand');

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <h1 className="hidden text-lg font-semibold md:block font-headline">
        {pageTitles[pathname] || 'CreatorIQ'}
      </h1>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex-1 sm:flex-initial">
          {/* Search can be added later */}
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.photoURL ?? undefined} alt={displayName} />
                <AvatarFallback>{getInitials(displayName)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/dashboard/settings">
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </Link>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {role === 'creator' && <Button>Request Brand Collab</Button>}
      </div>
    </header>
  );
}
