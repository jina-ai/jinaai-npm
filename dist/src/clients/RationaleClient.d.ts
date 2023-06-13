import { Languages } from '../shared-types';
import JinaClient from './HTTPClient';
import { PromptPerfectOutput } from './PromptPerfectClient';
import { SceneXOutput } from './SceneXClient';
export type RationaleInput = {
    data: Array<{
        decision: string;
        analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes';
        style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ';
        profileId?: string;
    }>;
};
export type RationaleOptions = {
    analysis?: 'proscons' | 'swot' | 'multichoice' | 'outcomes';
    style?: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ';
    profileId?: string;
    append?: string;
    prepend?: string;
};
export type RationaleProsConsOutput = {
    pros: {
        [key: string]: string;
    };
    cons: {
        [key: string]: string;
    };
    bestChoice: string;
    conclusion: string;
    confidenceScore: number;
};
export type RationaleSWOTOutput = {
    strengths: {
        [key: string]: string;
    };
    weaknesses: {
        [key: string]: string;
    };
    opportunities: {
        [key: string]: string;
    };
    threats: {
        [key: string]: string;
    };
    bestChoice: string;
    conclusion: string;
    confidenceScore: number;
};
export type RationaleMultichoiceOutput = {
    [key: string]: string;
};
export type RationaleOutcomesOutput = Array<{
    children: RationaleOutcomesOutput;
    labal: string;
    sentiment: string;
}>;
export type RationaleOutput = {
    result: {
        result: Array<{
            decision: string;
            decisionUserQuery: string;
            writingStyle: 'concise' | 'professional' | 'humor' | 'sarcastic' | 'childish' | 'genZ';
            hasUserProfile: Boolean;
            analysis: 'proscons' | 'swot' | 'multichoice' | 'outcomes';
            sourceLang: Languages;
            keyResults: RationaleProsConsOutput | RationaleSWOTOutput | RationaleMultichoiceOutput | RationaleOutcomesOutput;
            keyResultsConclusion: string;
            keyResultsBestChoice: string;
            confidence: number;
            createdAt: number;
            profileId: string | null;
            isQuality: Boolean;
            nonGibberish: Boolean;
            id: string;
        }>;
    };
};
type RationaleParams = {
    headers?: Record<string, string>;
    useCache?: boolean;
};
export default class RationaleClient extends JinaClient {
    constructor(params: RationaleParams);
    fromArray(input: Array<string>, options?: RationaleOptions): RationaleInput;
    fromString(input: string, options?: RationaleOptions): RationaleInput;
    fromSceneX(input: SceneXOutput, options?: RationaleOptions): RationaleInput;
    fromPromptPerfect(input: PromptPerfectOutput, options?: RationaleOptions): RationaleInput;
    isOutput(obj: any): obj is RationaleOutput;
    decide(data: RationaleInput): Promise<RationaleOutput>;
}
export {};