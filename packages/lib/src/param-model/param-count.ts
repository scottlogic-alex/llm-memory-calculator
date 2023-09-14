import { countParams as countParamsLlama, type LlamaParamCount } from './llama-params';
import type { ModelConfig } from '../model-model/model-db';
import { ModelFamily } from '../model-model/model-family';
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