'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { estimateFairPricing, type EstimateFairPricingOutput } from '@/ai/flows/estimate-fair-pricing';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, TrendingUp, Lightbulb } from 'lucide-react';

const FormSchema = z.object({
  platform: z.enum(['Instagram', 'YouTube', 'TikTok']),
  followers: z.coerce.number().min(1, "Followers must be greater than 0."),
  engagementRate: z.coerce.number().min(0, "Engagement rate cannot be negative."),
  niche: z.string().min(1, 'Niche is required.'),
  region: z.string().min(1, 'Region is required.'),
});

export default function ValuationPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateFairPricingOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platform: 'Instagram',
      followers: 120000,
      engagementRate: 5.2,
      niche: 'Tech Reviews',
      region: 'USA',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await estimateFairPricing(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get valuation. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Creator Valuation Engine</CardTitle>
          <CardDescription>Estimate your market value for brand collaborations.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  name="followers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Followers</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 120000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="engagementRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engagement Rate (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 5.2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="niche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Niche</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Gaming, Beauty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               </div>
               <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Region</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., USA, India" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Estimate My Worth
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-8">
        {loading && (
            <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-semibold">Calculating your value...</p>
                <p className="text-sm text-muted-foreground">Our AI is analyzing market data.</p>
            </Card>
        )}
        {result && (
          <>
            <Card className="text-center">
              <CardHeader>
                <CardDescription>Your Estimated Deal Rate</CardDescription>
                <CardTitle className="font-headline text-4xl text-primary">{result.suggestedPriceRange}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <div className="p-3 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardDescription>Percentile vs Peers</CardDescription>
                  <CardTitle className="font-headline text-2xl">{result.percentileVsPeers}</CardTitle>
                </div>
              </CardHeader>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary"/> Negotiation Tips</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{result.negotiationTips}</p>
                </CardContent>
            </Card>
          </>
        )}
         {!loading && !result && (
            <div className='flex items-center justify-center h-full'>
                <div className="text-center p-8">
                    <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Get Your Valuation</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Fill out your profile details to see what you're worth.
                    </p>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
