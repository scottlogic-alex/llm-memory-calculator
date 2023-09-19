import { ModelFamily } from './model-family';
import { LlamaModelSuite } from './llama-models';

export type ModelSuite = LlamaModelSuite;

// type X = typeof LlamaModelSuite[keyof typeof LlamaModelSuite];

export const modelSuites = {
  [ModelFamily.Llama]: Object.values(LlamaModelSuite) as LlamaModelSuite[],
  // [ModelFamily.Falcon]: [] as never[],
} as const satisfies {
  [family in ModelFamily]: ModelSuite[]
};