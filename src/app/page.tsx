import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorIQLogo, InstagramIcon, TikTokIcon, YouTubeIcon } from '@/components/icons';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex items-center gap-2">
            <CreatorIQLogo />
            <CardTitle className="font-headline text-3xl">CreatorIQ</CardTitle>
          </div>
          <CardDescription>
            Sign in to connect your accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">
              <InstagramIcon className="mr-2 h-5 w-5" />
              Connect with Instagram
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">
              <YouTubeIcon className="mr-2 h-5 w-5" />
              Connect with YouTube
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/dashboard">
              <TikTokIcon className="mr-2 h-5 w-5" />
              Connect with TikTok
            </Link>
          </Button>
        </CardContent>
      </Card>
      <p className="text-center text-xs text-muted-foreground mt-4">
        This is a demo application. Clicking any button will take you to the dashboard.
      </p>
    </main>
  );
}
