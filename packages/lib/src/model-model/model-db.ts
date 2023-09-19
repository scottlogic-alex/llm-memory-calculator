import { ModelFamily } from './model-family';
import type { modelSuites } from './model-suite';
import { llamaSuites, type LlamaConfig } from './llama-models';

export type ModelConfig = LlamaConfig;

export const models = {
  [ModelFamily.Llama]: llamaSuites,
  [ModelFamily.Falcon]: {},
} as const satisfies {
  [family in ModelFamily]: {
    [suite in (typeof modelSuites)[family][number]]: {
      [model: string]: ModelConfig;
    };
  };
};