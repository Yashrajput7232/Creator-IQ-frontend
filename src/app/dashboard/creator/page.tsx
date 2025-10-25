'use client';

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { ArrowUpRight, Instagram, Users, Youtube, Clapperboard } from 'lucide-react';
import { platformComparisonData, engagementData, audienceDemographicsData } from '@/lib/mock-data';
import { TikTokIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';

const chartConfig = {
  views: {
    label: 'Views',
  },
  Instagram: {
    label: 'Instagram',
    color: 'hsl(var(--chart-1))',
  },
  YouTube: {
    label: 'YouTube',
    color: 'hsl(var(--chart-2))',
  },
  TikTok: {
    label: 'TikTok',
    color: 'hsl(var(--chart-3))',
  },
};

export default function CreatorDashboardPage() {
  const { user } = useUser();

  return (
    <>
    <div className="flex justify-between items-center mb-6">
        <h1 className="font-headline text-2xl">Hey, {user?.displayName?.split(' ')[0] || 'Creator'} 👋 Here’s your performance summary.</h1>
    </div>
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card className="xl:col-span-3">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="font-headline text-2xl">Cross-Platform Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Last 30 days</p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120,453</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                 <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5.2%</div>
                <p className="text-xs text-muted-foreground">+2.8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+5,234</div>
                <p className="text-xs text-muted-foreground">Followers gained this month</p>
              </CardContent>
            </Card>
             <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Insights</CardTitle>
                <Clapperboard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground">Your reels are performing 15% better on weekends. Post more on Saturdays!</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">Engagement Rate Over Time</CardTitle>
          <CardDescription>January - July 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <LineChart data={engagementData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line dataKey="Instagram" type="monotone" stroke="var(--color-Instagram)" strokeWidth={2} dot={false} />
              <Line dataKey="YouTube" type="monotone" stroke="var(--color-YouTube)" strokeWidth={2} dot={false} />
              <Line dataKey="TikTok" type="monotone" stroke="var(--color-TikTok)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Audience Demographics</CardTitle>
          <CardDescription>Age distribution across all platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={{}} className="h-[250px] w-full">
            <BarChart data={audienceDemographicsData} layout="vertical" margin={{ left: 10 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
              <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="value" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
