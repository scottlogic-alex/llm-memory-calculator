export enum LLamaAttnType {
  MHA = 'MultiHeadAttention',
  GQA = 'GroupedQueryAttention',
}

export interface LlamaConfigAbstract<AttnType extends LLamaAttnType> {
  attn_type: AttnType;
  hidden_dim: number;
  intermediate_size: number;
  hidden_layers: number;
}
export interface LlamaConfigMHA extends LlamaConfigAbstract<LLamaAttnType.MHA> {
  attn_heads: number;
}

export interface LlamaConfigGQA extends LlamaConfigAbstract<LLamaAttnType.GQA> {
  q_heads: number;
  kv_heads: number;
}

export type LlamaConfig = LlamaConfigMHA | LlamaConfigGQA;

export type Llama1Models = {
  [modelName in '7b' | '13b' | '33b' | '65b']: LlamaConfigMHA;
}

export type Llama2Models = {
  [modelName in '7b' | '13b']: LlamaConfigMHA;
} & {
  [modelName in '34b' | '70b']: LlamaConfigGQA;
}

export const llamaVocabSize = 32000;

export const llama1Models: Llama1Models = {
  // https://huggingface.co/huggyllama/llama-7b/blob/main/config.json
  '7b': {
    attn_type: LLamaAttnType.MHA,
    hidden_dim: 4096,
    intermediate_size: 11008,
    hidden_layers: 32,
    attn_heads: 32,
  },
  // https://huggingface.co/huggyllama/llama-13b/blob/main/config.json
  '13b': {
    attn_type: LLamaAttnType.MHA,
    hidden_dim: 5120,
    intermediate_size: 13824,
    hidden_layers: 40,
    attn_heads: 40,
  },
  // https://huggingface.co/huggyllama/llama-30b/blob/main/config.json
  '33b': {
    attn_type: LLamaAttnType.MHA,
    hidden_dim: 6656,
    intermediate_size: 17920,
    hidden_layers: 60,
    attn_heads: 52,
  },
  // https://huggingface.co/huggyllama/llama-65b/blob/main/config.json
  '65b': {
    attn_type: LLamaAttnType.MHA,
    hidden_dim: 8192,
    intermediate_size: 22016,
    hidden_layers: 80,
    attn_heads: 64,
  }
};

export const llama2Models: Llama2Models = {
  // https://huggingface.co/meta-llama/Llama-2-7b-hf/blob/main/config.json
  '7b': llama1Models['7b'],
  // https://huggingface.co/meta-llama/Llama-2-13b-hf/blob/main/config.json
  '13b': llama1Models['13b'],
  // https://huggingface.co/codellama/CodeLlama-34b-hf/blob/main/config.json
  '34b': {
    attn_type: LLamaAttnType.GQA,
    hidden_dim: 8192,
    intermediate_size: 22016,
    hidden_layers: 48,
    q_heads: 64,
    kv_heads: 8,
  },
  // https://huggingface.co/meta-llama/Llama-2-70b-hf/blob/main/config.json
  '70b': {
    attn_type: LLamaAttnType.GQA,
    hidden_dim: 8192,
    intermediate_size: 28672,
    hidden_layers: 80,
    q_heads: 64,
    kv_heads: 8,
  }
};