import { writable, type Writable } from 'svelte/store';
import { models } from '../model-model/model-db';
import { reducible, type Reducible, type Reducer } from '../store-common/reducible';
import { ModelFamily } from '../model-model/model-family';

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

export interface SuiteChoiceAction<Family extends ModelFamily> {
  family: Family,
  suite: keyof (typeof models)[Family],
}
const suiteChoiceByFamilyReducer: Reducer<SuiteChoiceByFamily, SuiteChoiceAction<ModelFamily>>
    = <Family extends ModelFamily>(
        state: SuiteChoiceByFamily,
        { family, suite }: SuiteChoiceAction<Family>,
    ): SuiteChoiceByFamily => ({
        ...state,
        [family]: suite,
    });

const [suiteChoiceByFamily, setSuiteChoiceByFamily_]: Reducible<SuiteChoiceByFamily, SuiteChoiceAction<ModelFamily>> = reducible(
    initialSuiteChoiceByFamily,
    suiteChoiceByFamilyReducer,
);

export const setSuiteChoiceByFamily =
  setSuiteChoiceByFamily_ as <Family extends ModelFamily>(action: SuiteChoiceAction<Family>) => void;
export { suiteChoiceByFamily };

export interface FamilyAndSuite<Family extends ModelFamily> {
    family: Family,
    suite: keyof (typeof models)[Family],
}

export type FamilyAndSuites = {
    [family in ModelFamily]: FamilyAndSuite<family>[];
}

export const familyAndSuitesByFamily: FamilyAndSuites = Object.fromEntries(
    Object.entries(models).map(
        <F extends ModelFamily>([family, suites]: [F, (typeof models)[F]]): [F, SuiteChoiceAction<F>[]] =>
        [
            family,
            (Object.keys(suites) as Array<keyof (typeof models)[F]>)
            .map<SuiteChoiceAction<F>>(
                (suite) => ({family, suite})
            )
        ]
    )
) as FamilyAndSuites;

export const familyAndSuite: Writable<FamilyAndSuite<ModelFamily>> = writable(familyAndSuitesByFamily[ModelFamily.Llama][0]);

export type ModelChoiceByFamilyAndSuite = {
  [family in ModelFamily]: {
    [suite in keyof (typeof models)[family]]: keyof (typeof models)[family][suite];
  };
};

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

export interface ModelChoiceByFamilyAndSuiteAction<
    Family extends ModelFamily = ModelFamily,
    Suite extends keyof (typeof models)[Family] = keyof (typeof models)[Family],
    Model extends keyof (typeof models)[Family][Suite] = keyof (typeof models)[Family][Suite],
> {
    family: Family,
    suite: Suite,
    model: Model,
}

const modelChoiceByFamilyAndSuiteReducer: Reducer<
    ModelChoiceByFamilyAndSuite,
    ModelChoiceByFamilyAndSuiteAction
> = <
        Family extends ModelFamily,
        Suite extends keyof (typeof models)[Family],
        Model extends keyof (typeof models)[Family][Suite],
    >(
        state: ModelChoiceByFamilyAndSuite,
        { family, suite, model }: ModelChoiceByFamilyAndSuiteAction<Family, Suite, Model>,
    ): ModelChoiceByFamilyAndSuite => ({
        ...state,
        [family]: {
            ...state[family],
            [suite]: model,
        },
    });
  
const [modelChoiceByFamilyAndSuite, setModelChoiceByFamilyAndSuite_]: Reducible<
    ModelChoiceByFamilyAndSuite,
    ModelChoiceByFamilyAndSuiteAction
> = reducible(
    initialModelChoiceByFamilyAndSuite,
    modelChoiceByFamilyAndSuiteReducer,
);
  
export const setModelChoiceByFamilyAndSuite = setModelChoiceByFamilyAndSuite_ as <
    Family extends ModelFamily,
    Suite extends keyof (typeof models)[Family],
    Model extends keyof (typeof models)[Family][Suite]
>(action: ModelChoiceByFamilyAndSuiteAction<Family, Suite, Model>) => void;

export { modelChoiceByFamilyAndSuite };