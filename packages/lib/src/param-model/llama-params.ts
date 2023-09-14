import type { ParamCountAbstract } from './param-count-abstract';
import {
    llamaHeadDim,
    llamaVocabSize,
    LLamaAttnType,
    type LlamaConfig,
} from '../model-model/llama-models';

const getReadHeadCount = (config: LlamaConfig): number => {
    const { attnType } = config;
    switch(attnType) {
      case LLamaAttnType.GQA:
        return config.qHeads;
      case LLamaAttnType.MHA:
        return config.attnHeads;
      default:
        throw new Error(`Unimplemented LLamaAttnType: ${attnType satisfies never}`);
    }
  };
  
  const getWriteHeadCount = (config: LlamaConfig): number => {
    const { attnType } = config;
    switch(attnType) {
      case LLamaAttnType.GQA:
        return config.kvHeads;
      case LLamaAttnType.MHA:
        return config.attnHeads;
      default:
        throw new Error(`Unimplemented LLamaAttnType: ${attnType satisfies never}`);
    }
  };
  
  export type LlamaParamCount = ParamCountAbstract;
  
  export const countParams = (config: LlamaConfig): LlamaParamCount => {
    const {
      hiddenDim,
      intermediateSize,
      hiddenLayers,
    } = config;
    const embedding = llamaVocabSize * hiddenDim;
    const unembedding = embedding;
  
    const readHeads: number = getReadHeadCount(config);
    const writeHeads: number = getWriteHeadCount(config);
  
    const qProj = hiddenDim * readHeads * llamaHeadDim;
    const kProj = hiddenDim * writeHeads * llamaHeadDim;
    const vProj = kProj;
    const oProj = hiddenDim ** 2;
  
    const gateProj = hiddenDim * intermediateSize;
    const upProj = gateProj, downProj = gateProj;
  
    const inputLayerNorm = hiddenDim;
    const postAttnLayerNorm = inputLayerNorm,
      norm = inputLayerNorm;
    
    const perLayerLN = inputLayerNorm + postAttnLayerNorm;
  
    const perLayerAttnProj
    = qProj
    + kProj
    + vProj
    + oProj;
  
    const perLayerFFN
    = gateProj
    + upProj
    + downProj;
  
    const total
    = embedding
    + hiddenLayers * (
      perLayerAttnProj
      + perLayerFFN
      + perLayerLN
    )
    + norm
    + unembedding;
  
    return {
      embedding,
      unembedding,
      layers: hiddenLayers,
      nonRepeatedLN: norm,
      perLayerLN,
      perLayerAttnProj,
      perLayerFFN,
      total,
    } satisfies LlamaParamCount;
  };