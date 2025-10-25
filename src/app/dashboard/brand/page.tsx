'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Users, Activity, Target } from "lucide-react";
import { TikTokIcon, YouTubeIcon, InstagramIcon } from '@/components/icons';

const mockCreators = [
  { id: 1, name: 'Casey Neistat', avatar: '/avatars/casey.jpg', platform: 'YouTube', engagement: '8.1%', dealRange: '$15k - $25k' },
  { id: 2, name: 'MKBHD', avatar: '/avatars/mkbhd.jpg', platform: 'YouTube', engagement: '9.5%', dealRange: '$30k - $50k' },
  { id: 3, name: 'Chiara Ferragni', avatar: '/avatars/chiara.jpg', platform: 'Instagram', engagement: '4.2%', dealRange: '$20k - $40k' },
  { id: 4, name: 'Charli D’Amelio', avatar: '/avatars/charli.jpg', platform: 'TikTok', engagement: '10.3%', dealRange: '$50k+' },
  { id: 5, name: 'Peter McKinnon', avatar: '/avatars/peter.jpg', platform: 'Instagram', engagement: '7.8%', dealRange: '$10k - $18k' },
  { id: 6, name: 'Lilly Singh', avatar: '/avatars/lilly.jpg', platform: 'YouTube', engagement: '6.5%', dealRange: '$12k - $22k' },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
    switch (platform.toLowerCase()) {
        case 'youtube': return <YouTubeIcon className="w-5 h-5" />;
        case 'instagram': return <InstagramIcon className="w-5 h-5" />;
        case 'tiktok': return <TikTokIcon className="w-5 h-5" />;
        default: return null;
    }
}

export default function BrandDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCreators = mockCreators.filter(creator => 
    creator.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Campaigns</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
             <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">8</div>
            <p className="text-xs text-muted-foreground">Awaiting creator response</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performing Creator</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">MKBHD</div>
            <p className="text-xs text-muted-foreground">9.5% engagement rate</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4M</div>
             <p className="text-xs text-muted-foreground">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      {/* Discover Creators Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-xl">Discover Creators</CardTitle>
          <CardDescription>Find the perfect creators for your next campaign.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="relative w-full sm:w-auto flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name..." className="pl-10" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="fitness">Fitness</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Follower Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1k-10k">1k – 10k</SelectItem>
                <SelectItem value="10k-100k">10k – 100k</SelectItem>
                <SelectItem value="100k+">100k+</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto">Apply Filters</Button>
          </div>

          {/* Creator Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map(creator => (
              <Card key={creator.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-2 border-secondary">
                      <AvatarImage src={`https://i.pravatar.cc/150?u=${creator.id}`} />
                      <AvatarFallback>{creator.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{creator.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <PlatformIcon platform={creator.platform} />
                        <span>{creator.platform}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-sm text-muted-foreground">Engagement</p>
                        <p className="font-bold text-secondary">{creator.engagement}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Deal Range</p>
                        <p className="font-bold">{creator.dealRange}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" className="w-full">View Profile</Button>
                    <Button className="w-full bg-secondary hover:bg-secondary/90">Request Collab</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
