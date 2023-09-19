import { writable, type Writable } from 'svelte/store';
import { LlamaModelSuite } from '../model-model/llama-models';
import type { ModelSuite } from '../model-model/model-suite';
import { models } from '../model-model/model-db';
import { reducible, type Reducible, type Reducer } from '../store-common/reducible';
import { ModelFamily } from '../model-model/model-family';

export type FamilyAndSuite<F extends ModelFamily, S extends keyof (typeof models)[F]> = [family: F, suite: S];

export const family: Writable<ModelFamily> = writable(ModelFamily.Llama);

export type SuiteChoiceByFamily = {
    [family in ModelFamily]: keyof (typeof models)[family];
  }
const initialSuiteChoiceByFamily: SuiteChoiceByFamily = Object.values(ModelFamily)
    .reduce(
    <F extends ModelFamily>(
        acc: Partial<SuiteChoiceByFamily>,
        family: F
    ): Partial<SuiteChoiceByFamily> => {
        const suites: Array<keyof (typeof models)[F]> = Object.keys(models[family]) as Array<keyof (typeof models)[F]>;
        const firstSuite: keyof (typeof models)[F] = suites[0];
        acc[family] = firstSuite as typeof acc[typeof family];
        return acc;
    },
    {},
    ) as SuiteChoiceByFamily;

export interface SuiteChoice<Family extends ModelFamily> {
  family: Family,
  suite: keyof (typeof models)[Family],
}
const suiteChoiceByFamilyReducer: Reducer<SuiteChoiceByFamily, SuiteChoice<ModelFamily>>
    = <Family extends ModelFamily>(
        state: SuiteChoiceByFamily,
        { family, suite }: SuiteChoice<Family>,
    ): SuiteChoiceByFamily => ({
        ...state,
        [family]: suite,
    });

const [suiteChoiceByFamily, setSuiteChoiceByFamily_]: Reducible<SuiteChoiceByFamily, SuiteChoice<ModelFamily>> = reducible(
    initialSuiteChoiceByFamily,
    suiteChoiceByFamilyReducer,
);

export const setSuiteChoiceByFamily =
  setSuiteChoiceByFamily_ as <Family extends ModelFamily>(action: SuiteChoice<Family>) => void;
export { suiteChoiceByFamily };

// export const modelSuite: Writable<ModelSuite> = writable(ModelSuite.Llama1);

export type ModelChoiceByFamilyAndSuite = {
  [family in ModelFamily]: {
    [suite in keyof (typeof models)[family]]: keyof (typeof models)[family][suite];
  };
}
// type J = keyof typeof models[ModelFamily.Llama];
// type X = typeof models[ModelFamily.Llama][LlamaModelSuite.Llama1];
// type Y = keyof typeof models[ModelFamily.Llama][LlamaModelSuite.Llama1];
// type N = keyof typeof models[ModelFamily.Llama];

// type Z = {
//     [key in keyof typeof models[ModelFamily.Llama]]: keyof typeof models[ModelFamily.Llama][key];
// }
// type H = {
//     [key in keyof typeof models[ModelFamily.Llama]]: keyof typeof models[ModelFamily.Llama][key];
// };

const initialModelChoiceByFamilyAndSuite: ModelChoiceByFamilyAndSuite = Object.values(ModelFamily)
    .reduce(
    <F extends ModelFamily>(
        acc: Partial<ModelChoiceByFamilyAndSuite>,
        family: F
    ): Partial<ModelChoiceByFamilyAndSuite> => {
        const suites: Array<keyof (typeof models)[F]> = Object.keys(models[family]) as Array<keyof (typeof models)[F]>;

        type ModelBySuite = {
            [suite in keyof typeof models[F]]: keyof typeof models[F][suite];
        };

        const modelBySuite: ModelBySuite = suites.reduce(
            <Suite extends keyof typeof models[F]>(
                acc: Partial<ModelBySuite>,
                suite: Suite,
            ): Partial<ModelBySuite> => {
                const modelsInSuite: Array<keyof typeof models[F][Suite]> = Object.keys(models[family][suite]) as Array<keyof typeof models[F][Suite]>;
                const firstModel: keyof typeof models[F][Suite] = modelsInSuite[0];
                acc[suite] = firstModel as typeof acc[typeof suite];
                return acc;
            },
        {}) as ModelBySuite;

        acc[family] = modelBySuite as typeof acc[typeof family];
        return acc;
    },
    {},
    ) as ModelChoiceByFamilyAndSuite;

console.log(initialModelChoiceByFamilyAndSuite);

// Object.values(ModelSuite)
//   .reduce(
//     <A extends ModelSuite>(
//       acc: Partial<ModelChoiceByFamilyAndSuite>,
//       arch: A
//     ): Partial<ModelChoiceByFamilyAndSuite> => {
//       const possibleKeys: Array<keyof (typeof models)[A]> = Object.keys(models[arch]) as Array<keyof (typeof models)[A]>;
//       const firstKey: keyof (typeof models)[A] = possibleKeys[0];
//       acc[arch] = firstKey as typeof acc[typeof arch];
//       return acc;
//     },
//     {},
//   ) as ModelChoiceByFamilyAndSuite;