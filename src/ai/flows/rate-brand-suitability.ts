'use server';
/**
 * @fileOverview An AI agent that rates a creator's suitability for brand sponsorships.
 *
 * - rateBrandSuitability - A function that handles the brand suitability rating process.
 * - RateBrandSuitabilityInput - The input type for the rateBrandSuitability function.
 * - RateBrandSuitabilityOutput - The return type for the rateBrandSuitability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateBrandSuitabilityInputSchema = z.object({
  engagementQuality: z
    .number()
    .describe('A score representing the quality of engagement on the creator\'s content (0-100).'),
  postingConsistency: z
    .number()
    .describe('A score representing how consistently the creator posts content (0-100).'),
  nicheAlignment: z
    .number()
    .describe('A score representing how well the creator\'s content aligns with a specific niche (0-100).'),
  audienceAuthenticity: z
    .number()
    .describe('A score representing the authenticity of the creator\'s audience (0-100).'),
});
export type RateBrandSuitabilityInput = z.infer<typeof RateBrandSuitabilityInputSchema>;

const RateBrandSuitabilityOutputSchema = z.object({
  overallScore: z
    .number()
    .describe('The overall brand readiness score, out of 100.'),
  breakdown: z.object({
    engagementQuality: z.number().describe('The score for engagement quality.'),
    postingConsistency: z.number().describe('The score for posting consistency.'),
    nicheAlignment: z.number().describe('The score for niche alignment.'),
    audienceAuthenticity: z.number().describe('The score for audience authenticity.'),
  }),
  tipsToImprove: z.array(z.string()).describe('Actionable tips to improve brand readiness.'),
});
export type RateBrandSuitabilityOutput = z.infer<typeof RateBrandSuitabilityOutputSchema>;

export async function rateBrandSuitability(input: RateBrandSuitabilityInput): Promise<RateBrandSuitabilityOutput> {
  return rateBrandSuitabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rateBrandSuitabilityPrompt',
  input: {schema: RateBrandSuitabilityInputSchema},
  output: {schema: RateBrandSuitabilityOutputSchema},
  prompt: `You are an AI assistant that rates a creator's suitability for brand sponsorships.

You will be provided with scores for engagement quality, posting consistency, niche alignment, and audience authenticity.
Based on these scores, you will calculate an overall brand readiness score (out of 100), provide a breakdown of the scores, and suggest actionable tips to improve brand readiness.

Engagement Quality: {{engagementQuality}}
Posting Consistency: {{postingConsistency}}
Niche Alignment: {{nicheAlignment}}
Audience Authenticity: {{audienceAuthenticity}}

Generate an overall score, a breakdown of the scores, and actionable tips to improve brand readiness.`,
});

const rateBrandSuitabilityFlow = ai.defineFlow(
  {
    name: 'rateBrandSuitabilityFlow',
    inputSchema: RateBrandSuitabilityInputSchema,
    outputSchema: RateBrandSuitabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
