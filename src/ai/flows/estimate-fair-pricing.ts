'use server';

/**
 * @fileOverview This file defines a Genkit flow for estimating fair pricing for brand deals.
 *
 * The flow takes a creator's engagement data and market benchmarks as input, and suggests
 * fair pricing for brand deals.
 *
 * @interface EstimateFairPricingInput - The input schema for the estimateFairPricing function.
 * @interface EstimateFairPricingOutput - The output schema for the estimateFairPricing function.
 * @function estimateFairPricing - The function that executes the fair pricing estimation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateFairPricingInputSchema = z.object({
  platform: z.enum(['Instagram', 'YouTube', 'TikTok']).describe('The social media platform.'),
  followers: z.number().describe('Number of followers on the platform.'),
  engagementRate: z.number().describe('Average engagement rate (e.g., likes, comments) on the platform.'),
  niche: z.string().describe('The creator\u2019s content niche (e.g., beauty, gaming, lifestyle).'),
  region: z.string().describe('The creator\u2019s primary geographic region.'),
});

export type EstimateFairPricingInput = z.infer<typeof EstimateFairPricingInputSchema>;

const EstimateFairPricingOutputSchema = z.object({
  suggestedPriceRange: z.string().describe('The suggested price range for brand deals (e.g., \"$500 - $750\").'),
  percentileVsPeers: z.string().describe('The creator\u2019s percentile ranking compared to similar creators (e.g., \"Top 20%\").'),
  negotiationTips: z.string().describe('Tips for negotiating brand deals based on the valuation.'),
});

export type EstimateFairPricingOutput = z.infer<typeof EstimateFairPricingOutputSchema>;

export async function estimateFairPricing(input: EstimateFairPricingInput): Promise<EstimateFairPricingOutput> {
  return estimateFairPricingFlow(input);
}

const estimateFairPricingPrompt = ai.definePrompt({
  name: 'estimateFairPricingPrompt',
  input: {schema: EstimateFairPricingInputSchema},
  output: {schema: EstimateFairPricingOutputSchema},
  prompt: `You are an expert in influencer marketing and brand deal valuation. Given the following information about a creator, estimate a fair price range for brand deals, their percentile ranking versus peers, and provide negotiation tips.

Platform: {{{platform}}}
Followers: {{{followers}}}
Engagement Rate: {{{engagementRate}}}
Niche: {{{niche}}}
Region: {{{region}}}

Consider factors such as audience demographics, content quality, and market demand in your analysis.  Provide a suggested price range, percentile ranking, and 2-3 negotiation tips.  The negotiation tips should be very brief.

Here is an example of the output format you should strive for, but adapt it to the specific details of the input:

Suggested Price Range: $500 - $750
Percentile vs Peers: Top 20%
Negotiation Tips:
- Highlight strong engagement rate.
- Showcase successful past collaborations.
- Emphasize unique audience insights.
`,
});

const estimateFairPricingFlow = ai.defineFlow(
  {
    name: 'estimateFairPricingFlow',
    inputSchema: EstimateFairPricingInputSchema,
    outputSchema: EstimateFairPricingOutputSchema,
  },
  async input => {
    const {output} = await estimateFairPricingPrompt(input);
    return output!;
  }
);
