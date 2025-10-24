'use server';
/**
 * @fileOverview A flow to find competitor accounts on social media.
 *
 * - findCompetitors - A function that finds competitor accounts based on a platform and a handle or niche.
 * - FindCompetitorsInput - The input type for the findCompetitors function.
 * - FindCompetitorsOutput - The return type for the findCompetitors function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FindCompetitorsInputSchema = z.object({
  platform: z.enum(['Instagram', 'YouTube', 'TikTok']).describe('The social media platform.'),
  handleOrNiche: z.string().describe('The user\'s handle or a specific niche to search for competitors in.'),
});
export type FindCompetitorsInput = z.infer<typeof FindCompetitorsInputSchema>;

const CompetitorSchema = z.object({
  username: z.string().describe('The username of the competitor.'),
  followerCount: z.string().describe('The competitor\'s follower count (e.g., "1.2M", "250K").'),
  niche: z.string().describe('The primary niche of the competitor.'),
  reason: z.string().describe('A brief explanation of why this account is considered a competitor.'),
});

const FindCompetitorsOutputSchema = z.object({
  competitors: z.array(CompetitorSchema).describe('A list of competitor accounts.'),
});
export type FindCompetitorsOutput = z.infer<typeof FindCompetitorsOutputSchema>;

export async function findCompetitors(input: FindCompetitorsInput): Promise<FindCompetitorsOutput> {
  return findCompetitorsFlow(input);
}

const findCompetitorsPrompt = ai.definePrompt({
  name: 'findCompetitorsPrompt',
  input: {schema: FindCompetitorsInputSchema},
  output: {schema: FindCompetitorsOutputSchema},
  prompt: `You are an expert in social media marketing and competitive analysis.

Based on the provided platform and user handle or niche, identify 5-7 competitor accounts.
For each competitor, provide their username, follower count, primary niche, and a brief reason why they are a relevant competitor.

Platform: {{{platform}}}
User Handle or Niche: {{{handleOrNiche}}}

Present the output as a list of competitor objects.
`,
});

const findCompetitorsFlow = ai.defineFlow(
  {
    name: 'findCompetitorsFlow',
    inputSchema: FindCompetitorsInputSchema,
    outputSchema: FindCompetitorsOutputSchema,
  },
  async input => {
    const {output} = await findCompetitorsPrompt(input);
    return output!;
  }
);
