'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { contentStrategyRecommendations, type ContentStrategyRecommendationsOutput } from '@/ai/flows/content-strategy-recommendations';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockPosts } from '@/lib/mock-data';
import Image from 'next/image';
import { Bot, Loader2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const FormSchema = z.object({
  platform: z.enum(['instagram', 'youtube', 'tiktok']),
  contentData: z.string().min(1, 'Content data is required.'),
  creatorProfile: z.string().min(1, 'Creator profile is required.'),
});

export default function ContentInsightsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ContentStrategyRecommendationsOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      platform: 'instagram',
      contentData: "Past 30 days data: 10 videos posted. Average views: 50k. Reels on weekends get 2x engagement. Top hashtags: #CreatorLife #TechReview.",
      creatorProfile: "Tech reviewer focusing on budget gadgets. Audience: 18-25 year olds, mostly male. Goal: Increase YouTube subscribers.",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    setResult(null);
    try {
      const res = await contentStrategyRecommendations(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
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
            <CardTitle className="font-headline">Get AI Recommendations</CardTitle>
            <CardDescription>Provide data to get personalized content strategy tips.</CardDescription>
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
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="youtube">YouTube</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contentData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content Performance Data</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Post frequency, top performing content..." {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="creatorProfile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Creator Profile</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Niche, target audience, goals..." {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                  Analyze Content
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>

      <div className="md:col-span-2 space-y-8">
        {(loading || result) && (
             <Card>
                <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Bot /> AI-Powered Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {loading && (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Generating insights...</span>
                        </div>
                    )}
                    {result && (
                        <>
                        <div>
                            <h3 className="font-semibold mb-2">Analysis Summary</h3>
                            <p className="text-sm text-muted-foreground">{result.analysisSummary}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-2">Recommendations</h3>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                            {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                            </ul>
                        </div>
                        </>
                    )}
                </CardContent>
            </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Recent Content Performance</CardTitle>
            <CardDescription>Your latest posts across all platforms.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead className="text-right">Views</TableHead>
                  <TableHead className="text-right">Likes</TableHead>
                  <TableHead className="text-right">AI Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium flex items-center gap-4">
                        <Image src={post.thumbnailUrl} alt="Thumbnail" width={80} height={60} className="rounded-md object-cover" data-ai-hint={post.thumbnailHint}/>
                        <span>{post.type} - {post.date.toLocaleDateString()}</span>
                    </TableCell>
                    <TableCell><Badge variant="secondary">{post.platform}</Badge></TableCell>
                    <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{post.likes.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{post.aiScore}/10</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
