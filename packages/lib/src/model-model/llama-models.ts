import { ModelFamily } from './model-family';
import type { AbstractModelConfig } from './model-config-abstract';

export enum LlamaModelSuite {
  Llama1 = 'LLaMA',
  Llama2 = 'Llama 2',
}

export enum LLamaAttnType {
  MHA = 'MultiHeadAttention',
  GQA = 'GroupedQueryAttention',
}

export interface LlamaConfigAbstract<AttnType extends LLamaAttnType> extends AbstractModelConfig<ModelFamily.Llama>  {
  attnType: AttnType;
  hiddenDim: number;
  intermediateSize: number;
  hiddenLayers: number;
}
export interface LlamaConfigMHA extends LlamaConfigAbstract<LLamaAttnType.MHA> {
  attnHeads: number;
}

export interface LlamaConfigGQA extends LlamaConfigAbstract<LLamaAttnType.GQA> {
  qHeads: number;
  kvHeads: number;
}

export type LlamaConfig = LlamaConfigMHA | LlamaConfigGQA;

export type Llama1Models = {
  [modelName in '7b' | '13b' | '33b' | '65b']: LlamaConfigMHA;
}

type Llama2GQAModels = {
  [modelName in '34b' | '70b']: LlamaConfigGQA;
}
export type Llama2Models = {
  [modelName in '7b' | '13b']: LlamaConfigMHA;
} & Llama2GQAModels;

export const llamaHeadDim = 128;
export const llamaVocabSize = 32000;

export const llama1Models: Llama1Models = Object.entries({
  // https://huggingface.co/huggyllama/llama-7b/blob/main/config.json
  '7b': {
    hiddenDim: 4096,
    intermediateSize: 11008,
    hiddenLayers: 32,
    attnHeads: 32,
  },
  // https://huggingface.co/huggyllama/llama-13b/blob/main/config.json
  '13b': {
    hiddenDim: 5120,
    intermediateSize: 13824,
    hiddenLayers: 40,
    attnHeads: 40,
  },
  // https://huggingface.co/huggyllama/llama-30b/blob/main/config.json
  '33b': {
    hiddenDim: 6656,
    intermediateSize: 17920,
    hiddenLayers: 60,
    attnHeads: 52,
  },
  // https://huggingface.co/huggyllama/llama-65b/blob/main/config.json
  '65b': {
    hiddenDim: 8192,
    intermediateSize: 22016,
    hiddenLayers: 80,
    attnHeads: 64,
  }
} as const satisfies {
  [key in keyof Llama1Models]: Omit<LlamaConfigMHA, 'family' | 'attnType'>
}).reduce((acc: Partial<Llama1Models>, [key, config]: [key: string, config: Omit<LlamaConfigMHA, 'family' | 'attnType'>]): Partial<Llama1Models> => {
  acc[key] = {
    attnType: LLamaAttnType.MHA,
    family: ModelFamily.Llama,
    ...config,
  } satisfies LlamaConfigMHA;
  return acc;
}, {}) as Llama1Models;

export const llama2Models: Llama2Models = {
  // https://huggingface.co/meta-llama/Llama-2-7b-hf/blob/main/config.json
  '7b': llama1Models['7b'],
  // https://huggingface.co/meta-llama/Llama-2-13b-hf/blob/main/config.json
  '13b': llama1Models['13b'],
  ...Object.entries({
    // https://huggingface.co/codellama/CodeLlama-34b-hf/blob/main/config.json
    '34b': {
      hiddenDim: 8192,
      intermediateSize: 22016,
      hiddenLayers: 48,
      qHeads: 64,
      kvHeads: 8,
    },
    // https://huggingface.co/meta-llama/Llama-2-70b-hf/blob/main/config.json
    '70b': {
      hiddenDim: 8192,
      intermediateSize: 28672,
      hiddenLayers: 80,
      qHeads: 64,
      kvHeads: 8,
    }
  } as const satisfies {
    [key in keyof Llama2GQAModels]: Omit<LlamaConfigGQA, 'family' | 'attnType'>
  }).reduce((acc: Partial<Llama2GQAModels>, [key, config]: [key: string, config: Omit<LlamaConfigGQA, 'family' | 'attnType'>]): Partial<Llama2GQAModels> => {
    acc[key] = {
      attnType: LLamaAttnType.GQA,
      family: ModelFamily.Llama,
      ...config,
    } satisfies LlamaConfigGQA;
    return acc;
  }, {}) as Llama2GQAModels
};

export const llamaSuites = {
  [LlamaModelSuite.Llama1]: llama1Models,
  [LlamaModelSuite.Llama2]: llama2Models,
};