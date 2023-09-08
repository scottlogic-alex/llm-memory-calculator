import { llama1Models, llama2Models } from './llama-models';

export enum ModelArch {
  Llama1 = 'LLaMA',
  Llama2 = 'Llama 2',
}

export const models = {
  [ModelArch.Llama1]: llama1Models,
  [ModelArch.Llama2]: llama2Models,
} as const satisfies { [key in ModelArch]: object };