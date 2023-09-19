import { writable, type Writable } from 'svelte/store';
import { ModelSuite } from './model-suite';
import { models } from './model-db';
import { reducible, type Reducible, type Reducer, type Dispatch } from '../store-common/reducible';

export const modelSuite: Writable<ModelSuite> = writable(ModelSuite.Llama1);

export type ModelChoiceBySuite = {
  [suite in ModelSuite]: keyof (typeof models)[suite];
}
const initialModelChoiceBySuite: ModelChoiceBySuite = Object.values(ModelSuite)
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
  ) as ModelChoiceBySuite;

export interface NextModelChoice<Suite extends ModelSuite> {
  suite: Suite,
  model: keyof (typeof models)[Suite],
}
const modelChoiceBySuiteReducer: Reducer<ModelChoiceBySuite, NextModelChoice<ModelSuite>> = <Suite extends ModelSuite>(
  state: ModelChoiceBySuite,
  action: NextModelChoice<Suite>,
): ModelChoiceBySuite => {
  return {
    ...state,
    [action.suite]: action.model,
  };
};

const [modelChoiceBySuite, setModelChoiceBySuite_]: Reducible<ModelChoiceBySuite, NextModelChoice<ModelSuite>> = reducible(
  initialModelChoiceBySuite,
  modelChoiceBySuiteReducer,
);

export const setModelChoiceBySuite =
  setModelChoiceBySuite_ as <Suite extends ModelSuite>(action: NextModelChoice<Suite>) => void;
export { modelChoiceBySuite };