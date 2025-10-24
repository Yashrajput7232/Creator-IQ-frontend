'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { rateBrandSuitability, type RateBrandSuitabilityOutput } from '@/ai/flows/rate-brand-suitability';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Award, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const FormSchema = z.object({
  engagementQuality: z.number().min(0).max(100),
  postingConsistency: z.number().min(0).max(100),
  nicheAlignment: z.number().min(0).max(100),
  audienceAuthenticity: z.number().min(0).max(100),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export default function BrandReadinessPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RateBrandSuitabilityOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      engagementQuality: 85,
      postingConsistency: 95,
      nicheAlignment: 75,
      audienceAuthenticity: 90,
    },
  });

  async function onSubmit(data: FormSchemaType) {
    setLoading(true);
    setResult(null);
    try {
      const res = await rateBrandSuitability(data);
      setResult(res);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to get brand readiness score. Please try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Brand Readiness Assessment</CardTitle>
          <CardDescription>Rate your profile on key metrics to get your sponsorship suitability score. These would typically be calculated automatically.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-8">
              {(Object.keys(form.getValues()) as Array<keyof FormSchemaType>).map(fieldName => (
                <FormField
                  key={fieldName}
                  control={form.control}
                  name={fieldName}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</FormLabel>
                        <span className="text-sm font-medium text-primary">{field.value}</span>
                      </div>
                      <FormControl>
                        <Slider
                          onValueChange={(value) => field.onChange(value[0])}
                          defaultValue={[field.value]}
                          max={100}
                          step={1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Calculate My Score
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <div className="space-y-8">
        {loading && (
            <Card className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg font-semibold">Generating your report...</p>
                <p className="text-sm text-muted-foreground">Our AI is benchmarking your profile.</p>
            </Card>
        )}
        {result && (
          <>
            <Card className="text-center">
              <CardHeader>
                <CardDescription>Your Brand-Readiness Score</CardDescription>
                <div className="relative mx-auto h-32 w-32">
                  <svg className="h-full w-full" viewBox="0 0 36 36">
                    <path
                      className="text-primary/20"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="currentColor" strokeWidth="3"
                    />
                    <path
                      className="text-primary"
                      strokeDasharray={`${result.overallScore}, 100`}
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-headline text-4xl font-bold">{result.overallScore}</span>
                    <span className="text-xs">/ 100</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Award /> Score Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(result.breakdown).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-sm text-muted-foreground">{value}/100</p>
                    </div>
                    <Progress value={value} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2"><Lightbulb className="text-primary" /> Tips to Improve</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    {result.tipsToImprove.map((tip, i) => <li key={i}>{tip}</li>)}
                  </ul>
                </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
