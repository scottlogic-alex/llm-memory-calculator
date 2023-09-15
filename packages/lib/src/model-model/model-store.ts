import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { ModelSuite } from './model-suite';
import { models, type ModelConfig } from './model-db';

export const modelSuite: Writable<ModelSuite> = writable(ModelSuite.Llama1);

type ModelChoiceBySuite = {
  [suite in ModelSuite]: Writable<keyof (typeof models)[suite]>
}
let modelChoiceBySuite: ModelChoiceBySuite = Object.values(ModelSuite).reduce(<A extends ModelSuite>(acc: Partial<ModelChoiceBySuite>, arch: A): Partial<ModelChoiceBySuite> => {
  const possibleKeys: Array<keyof (typeof models)[A]> = Object.keys(models[arch]) as Array<keyof (typeof models)[A]>;
  const firstKey: keyof (typeof models)[A] = possibleKeys[0];
  const writeable_: Writable<keyof (typeof models)[A]> = writable(firstKey);
  acc[arch] = writeable_ as typeof acc[typeof arch];
  return acc;
}, {}) as ModelChoiceBySuite;