'use server';
/**
 * @fileOverview Content strategy recommendations flow.
 *
 * - contentStrategyRecommendations - A function that analyzes content performance and recommends strategies for improvement.
 * - ContentStrategyRecommendationsInput - The input type for the contentStrategyRecommendations function.
 * - ContentStrategyRecommendationsOutput - The return type for the contentStrategyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentStrategyRecommendationsInputSchema = z.object({
  platform: z.enum(['instagram', 'youtube', 'tiktok']).describe('The platform to analyze content from.'),
  contentData: z.string().describe('Data of content performance metrics from the platform.'),
  creatorProfile: z.string().describe('The profile information of the creator.'),
});
export type ContentStrategyRecommendationsInput = z.infer<typeof ContentStrategyRecommendationsInputSchema>;

const ContentStrategyRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of content strategy recommendations.'),
  analysisSummary: z.string().describe('A summary of the content performance analysis.'),
});
export type ContentStrategyRecommendationsOutput = z.infer<typeof ContentStrategyRecommendationsOutputSchema>;

export async function contentStrategyRecommendations(
  input: ContentStrategyRecommendationsInput
): Promise<ContentStrategyRecommendationsOutput> {
  return contentStrategyRecommendationsFlow(input);
}

const contentStrategyRecommendationsPrompt = ai.definePrompt({
  name: 'contentStrategyRecommendationsPrompt',
  input: {schema: ContentStrategyRecommendationsInputSchema},
  output: {schema: ContentStrategyRecommendationsOutputSchema},
  prompt: `You are an expert content strategist specializing in social media.

You will analyze the performance of the content data from {{platform}}, and the profile information of the creator.

Based on this information, you will provide a list of content strategy recommendations and a summary of the content performance analysis to help optimize content and increase engagement.

Content Data: {{{contentData}}}
Creator Profile: {{{creatorProfile}}}

Ensure that the recommendations are specific and actionable, such as suggesting changes to posting times, content types, or hashtag usage.
`,
});

const contentStrategyRecommendationsFlow = ai.defineFlow(
  {
    name: 'contentStrategyRecommendationsFlow',
    inputSchema: ContentStrategyRecommendationsInputSchema,
    outputSchema: ContentStrategyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await contentStrategyRecommendationsPrompt(input);
    return output!;
  }
);
