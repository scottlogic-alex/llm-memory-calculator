import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { ModelSuite } from './model-suite';
import { models, type ModelConfig } from './model-db';

export const modelSuite: Writable<ModelSuite> = writable(ModelSuite.Llama1);

type ModelChoiceBySuite = {
  [suite in ModelSuite]: keyof (typeof models)[suite];
}
const modelChoiceBySuite: Writable<ModelChoiceBySuite> = writable(
  Object.values(ModelSuite)
    .reduce(
      <A extends ModelSuite>(
        acc: Partial<ModelChoiceBySuite>,
        arch: A
      ): Partial<ModelChoiceBySuite> => {
        const possibleKeys: Array<keyof (typeof models)[A]> = Object.keys(models[arch]) as Array<keyof (typeof models)[A]>;
        const firstKey: keyof (typeof models)[A] = possibleKeys[0];
        acc[arch] = firstKey as typeof acc[typeof arch];
        return acc;
      },
      {},
    ) as ModelChoiceBySuite
);