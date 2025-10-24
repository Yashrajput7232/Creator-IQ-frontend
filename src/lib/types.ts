export type Deal = {
  id: string;
  brandName: string;
  deliverables: string;
  amount: number;
  deadline: Date;
  status: 'pending' | 'invoiced' | 'paid';
};

export type ContentPost = {
  id: string;
  platform: 'Instagram' | 'YouTube' | 'TikTok';
  type: 'Reel' | 'Post' | 'Video' | 'Short';
  views: number;
  likes: number;
  comments: number;
  aiScore: number;
  date: Date;
  thumbnailUrl: string;
  thumbnailHint: string;
};
