import { ModelSuite } from './model-suite';
import { llama1Models, llama2Models, type LlamaConfig } from './llama-models';

export type ModelConfig = LlamaConfig;

export const models = {
  [ModelSuite.Llama1]: llama1Models,
  [ModelSuite.Llama2]: llama2Models,
} as const satisfies {
  [arch in ModelSuite]: {
    [model: string]: ModelConfig;
  }
};