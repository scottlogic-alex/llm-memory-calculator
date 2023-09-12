import { countParams as countParamsLlama, type LlamaParamCount } from './llama-models';
import type { ModelConfig } from './model-db';
import { ModelFamily } from './model-family';
export type ParamCount = LlamaParamCount;

export const countParams = (config: ModelConfig): ParamCount => {
  switch (config.family) {
    case ModelFamily.Llama:
      return countParamsLlama(config);
    // case ModelFamily.Falcon:
    //   throw new Error(`Unimplemented ModelFamily: ${config.family}`);
    default:
      throw new Error(`Unimplemented ModelFamily: ${config.family satisfies never}`);
  }
};