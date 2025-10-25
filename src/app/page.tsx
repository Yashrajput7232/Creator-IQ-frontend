
'use client';

import { motion } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CreatorIQLogo, TikTokIcon } from '@/components/icons';
import {
  FileText,
  BarChart,
  Star,
  Users,
} from 'lucide-react';

const featureCards = [
    {
        icon: <FileText className="w-8 h-8 text-primary" />,
        title: 'Fair Creator Valuation',
        description: 'Get your true market worth based on engagement, niche, and growth metrics.',
    },
    {
        icon: <Users className="w-8 h-8 text-primary" />,
        title: 'Smart Brand Matching',
        description: 'AI-driven brand–creator matchmaking for better ROI and relevance.',
    },
    {
        icon: <BarChart className="w-8 h-8 text-primary" />,
        title: 'Campaign Collaboration',
        description: 'Chat, negotiate, and track all deals in one seamless dashboard.',
    },
    {
        icon: <Star className="w-8 h-8 text-primary" />,
        title: 'Performance Insights',
        description: 'Visualize content reach, engagement, and audience health across platforms.',
    },
];

const testimonials = [
    {
        quote: "CreatorIQ gave me the data I needed to double my brand deal rates. It's a game-changer.",
        author: "Alex a",
        role: "Tech Creator, 250k+ Followers"
    },
    {
        quote: "Finding the right creators used to take weeks. With CreatorIQ, we found our perfect match in two days.",
        author: "Samantha B",
        role: "Head of Marketing, FashionNova"
    }
]

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <CreatorIQLogo className="h-8 w-8" />
            <span className="font-headline text-xl font-bold">CreatorIQ</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Features</Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>
          <div className='flex items-center gap-2'>
            <Link href="/login" legacyBehavior>
                <Button variant='ghost'>Login</Button>
            </Link>
            <Link href="/login" legacyBehavior>
                <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-20 md:py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
              Connect. Collaborate. Create.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                CreatorIQ bridges the gap between creators and brands with data-driven insights, fair valuations, and seamless collaboration tools.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/login?role=creator" legacyBehavior>
                <Button size="lg" className='bg-primary hover:bg-primary/90 text-primary-foreground'>I'm a Creator</Button>
              </Link>
              <Link href="/login?role=brand" legacyBehavior>
                <Button size="lg" variant="secondary" className='bg-secondary hover:bg-secondary/90 text-secondary-foreground'>I'm a Brand</Button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Smart Tools for Smarter Collaborations</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to succeed in the creator economy, all in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {featureCards.map((feature, index) => (
                <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <Card>
                        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                        {feature.icon}
                        <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </CardContent>
                    </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">Trusted by the Best</h2>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                {testimonials.map((testimonial) => (
                     <Card key={testimonial.author}>
                        <CardContent className='p-6'>
                            <p className="text-lg font-medium">"{testimonial.quote}"</p>
                            <footer className="mt-4">
                                <p className="font-semibold">{testimonial.author}</p>
                                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </footer>
                        </CardContent>
                     </Card>
                ))}
                </div>
            </div>
        </section>
        
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-muted border-t">
        <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2">
                <CreatorIQLogo className="h-6 w-6" />
                <span className="font-headline text-lg font-bold">CreatorIQ</span>
            </div>
          <p className="text-sm text-muted-foreground mt-4 md:mt-0">
            Join the next wave of digital influence. &copy; {new Date().getFullYear()} CreatorIQ.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Youtube size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><TikTokIcon className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={20} /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin size={20} /></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
