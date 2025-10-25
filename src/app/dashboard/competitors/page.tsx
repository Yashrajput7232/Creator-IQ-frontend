'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { findCompetitors, type FindCompetitorsOutput } from '@/ai/flows/find-competitors';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, UserSearch, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const FormSchema = z.object({
  platform: z.enum(['Instagram', 'YouTube', 'TikTok']),
  handleOrNiche: z.string().min(2, 'Please enter a valid handle or niche.'),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function CompetitorsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FindCompetitorsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platform: 'Instagram',
      handleOrNiche: 'tech reviews',
    },
  });

  async function onSubmit(data: FormSchemaType) {
    setLoading(true);
    setResult(null);
    try {
      const res = await findCompetitors(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to find competitors. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2"><UserSearch /> Competitor Analysis</CardTitle>
            <CardDescription>Discover other creators in your space to learn from and collaborate with.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="platform"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Platform</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select a platform" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="YouTube">YouTube</SelectItem>
                          <SelectItem value="TikTok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="handleOrNiche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Handle or Niche</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., @yourhandle or 'skincare'" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Find Competitors
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      <div className="md:col-span-2">
        {loading && (
            <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-semibold">Scanning the digital landscape...</p>
                <p className="text-sm text-muted-foreground">Our AI is identifying top creators in your niche.</p>
            </Card>
        )}
        {result && (
           <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2"><Users /> Top Competitors</CardTitle>
              <CardDescription>
                Here are some popular creators in the '{form.getValues('handleOrNiche')}' space on {form.getValues('platform')}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Followers</TableHead>
                    <TableHead>Niche</TableHead>
                    <TableHead>Why they're relevant</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {result.competitors.map((competitor) => (
                    <TableRow key={competitor.username}>
                      <TableCell className="font-medium">@{competitor.username}</TableCell>
                      <TableCell>{competitor.followerCount}</TableCell>
                      <TableCell>{competitor.niche}</TableCell>
                      <TableCell className="text-muted-foreground">{competitor.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {!loading && !result && (
            <div className='md:col-span-2 flex items-center justify-center h-full'>
                <div className="text-center p-8">
                    <UserSearch className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Find Your Peers</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Enter your niche to discover competitors and see how you stack up.
                    </p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
