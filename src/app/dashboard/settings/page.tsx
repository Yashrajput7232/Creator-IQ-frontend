import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-2">
      <h1 className="text-3xl font-semibold font-headline">Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Update your personal information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Alex Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="alex.doe@example.com" />
              </div>
              <Button>Save</Button>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Connected Accounts</CardTitle>
            <CardDescription>
              Manage your connected social media accounts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">Instagram</p>
                <p className="text-sm text-muted-foreground">@alexdoe_creates</p>
              </div>
              <Button variant="destructive">Disconnect</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">YouTube</p>
                <p className="text-sm text-muted-foreground">AlexDoeCreates</p>
              </div>
              <Button variant="destructive">Disconnect</Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <p className="font-medium">TikTok</p>
                <p className="text-sm text-muted-foreground">@alexdoe</p>
              </div>
              <Button variant="destructive">Disconnect</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
