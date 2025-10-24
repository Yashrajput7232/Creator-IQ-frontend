import type { ContentPost, Deal } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const mockDeals: Deal[] = [
  { id: '1', brandName: 'FashionNova', deliverables: '1 IG Post, 2 Stories', amount: 1200, deadline: new Date('2024-08-15'), status: 'paid' },
  { id: '2', brandName: 'Gymshark', deliverables: '1 YouTube Video', amount: 3500, deadline: new Date('2024-08-20'), status: 'invoiced' },
  { id: '3', brandName: 'HelloFresh', deliverables: '3 TikToks', amount: 2500, deadline: new Date('2024-09-01'), status: 'pending' },
  { id: '4', brandName: 'Audible', deliverables: '1 IG Reel', amount: 1500, deadline: new Date('2024-09-05'), status: 'pending' },
];

export const mockPosts: ContentPost[] = [
  { id: 'p1', platform: 'Instagram', type: 'Reel', views: 120543, likes: 15234, comments: 345, aiScore: 8.5, date: new Date('2024-07-28'), thumbnailUrl: PlaceHolderImages.find(p => p.id === 'content-1')?.imageUrl ?? '', thumbnailHint: PlaceHolderImages.find(p => p.id === 'content-1')?.imageHint ?? '' },
  { id: 'p2', platform: 'YouTube', type: 'Video', views: 890321, likes: 45000, comments: 2300, aiScore: 9.2, date: new Date('2024-07-25'), thumbnailUrl: PlaceHolderImages.find(p => p.id === 'content-2')?.imageUrl ?? '', thumbnailHint: PlaceHolderImages.find(p => p.id === 'content-2')?.imageHint ?? '' },
  { id: 'p3', platform: 'TikTok', type: 'Video', views: 2300000, likes: 450000, comments: 1200, aiScore: 9.0, date: new Date('2024-07-22'), thumbnailUrl: PlaceHolderImages.find(p => p.id === 'content-3')?.imageUrl ?? '', thumbnailHint: PlaceHolderImages.find(p => p.id === 'content-3')?.imageHint ?? '' },
  { id: 'p4', platform: 'Instagram', type: 'Post', views: 45000, likes: 6300, comments: 150, aiScore: 7.8, date: new Date('2024-07-20'), thumbnailUrl: PlaceHolderImages.find(p => p.id === 'content-4')?.imageUrl ?? '', thumbnailHint: PlaceHolderImages.find(p => p.id === 'content-4')?.imageHint ?? '' },
];

export const engagementData = [
    { date: 'Jan', Instagram: 4.8, YouTube: 4.2, TikTok: 6.5 },
    { date: 'Feb', Instagram: 5.1, YouTube: 4.4, TikTok: 6.8 },
    { date: 'Mar', Instagram: 5.5, YouTube: 4.1, TikTok: 7.0 },
    { date: 'Apr', Instagram: 5.2, YouTube: 4.5, TikTok: 7.2 },
    { date: 'May', Instagram: 5.6, YouTube: 4.8, TikTok: 7.5 },
    { date: 'Jun', Instagram: 5.8, YouTube: 5.0, TikTok: 7.8 },
    { date: 'Jul', Instagram: 5.3, YouTube: 4.9, TikTok: 7.6 },
];

export const platformComparisonData = [
    { platform: 'Instagram', value: 45, fill: 'hsl(var(--chart-1))' },
    { platform: 'YouTube', value: 30, fill: 'hsl(var(--chart-2))' },
    { platform: 'TikTok', value: 25, fill: 'hsl(var(--chart-3))' },
];

export const audienceDemographicsData = [
    { name: '13-17', value: 15, fill: 'hsl(var(--chart-1))' },
    { name: '18-24', value: 45, fill: 'hsl(var(--chart-2))' },
    { name: '25-34', value: 25, fill: 'hsl(var(--chart-3))' },
    { name: '35-44', value: 10, fill: 'hsl(var(--chart-4))' },
    { name: '45+', value: 5, fill: 'hsl(var(--chart-5))' },
];
