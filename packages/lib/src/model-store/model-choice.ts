import { writable, type Writable } from 'svelte/store';
import { models } from '../model-model/model-db';
import { reducible, type Reducible, type Reducer } from '../store-common/reducible';
import { ModelFamily } from '../model-model/model-family';

export interface FamilyAndSuite<Family extends ModelFamily = ModelFamily> {
    family: Family,
    suite: keyof (typeof models)[Family],
}

export type FamilyAndSuites = {
    [family in ModelFamily]: FamilyAndSuite<family>[];
}

export const familyAndSuitesByFamily: FamilyAndSuites = Object.fromEntries(
    Object.entries(models).map(
        <F extends ModelFamily>([family, suites]: [F, (typeof models)[F]]): [F, FamilyAndSuite<F>[]] =>
        [
            family,
            (Object.keys(suites) as Array<keyof (typeof models)[F]>)
            .map<FamilyAndSuite<F>>(
                (suite) => ({family, suite})
            )
        ]
    )
) as FamilyAndSuites;

const initialFamilyAndSuite: FamilyAndSuite = familyAndSuitesByFamily[ModelFamily.Llama][0];
export const familyAndSuite: Writable<FamilyAndSuite> = writable(initialFamilyAndSuite);

export type ModelByFamilyAndSuite = {
  [family in ModelFamily]: {
    [suite in keyof (typeof models)[family]]: keyof (typeof models)[family][suite];
  };
};

const initialModelByFamilyAndSuite: ModelByFamilyAndSuite = Object.values(ModelFamily)
    .reduce(
    <F extends ModelFamily>(
        acc: Partial<ModelByFamilyAndSuite>,
        family: F
    ): Partial<ModelByFamilyAndSuite> => {
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
    ) as ModelByFamilyAndSuite;

export interface SetModelByFamilyAndSuiteAction<FS extends FamilyAndSuite = FamilyAndSuite> {
    familyAndSuite: FamilyAndSuite;
    model: keyof (typeof models)[FS['family']][FS['suite']];
};

const reduceModelByFamilyAndSuite: Reducer<ModelByFamilyAndSuite, SetModelByFamilyAndSuiteAction> =
    <FS extends FamilyAndSuite>(
        state: ModelByFamilyAndSuite,
        {
            familyAndSuite: { family, suite },
            model,
        }: SetModelByFamilyAndSuiteAction<FS>,
    ): ModelByFamilyAndSuite => ({
        ...state,
        [family]: {
            ...state[family],
            [suite]: model,
        }
    });

export const [modelByFamilyAndSuite, setModelByFamilyAndSuite]: Reducible<ModelByFamilyAndSuite, SetModelByFamilyAndSuiteAction> = reducible(
    initialModelByFamilyAndSuite,
    reduceModelByFamilyAndSuite,
);

// export const setModelByFamilyAndSuite = setModelByFamilyAndSuite_ as
//     <FS extends FamilyAndSuite>(action: SetModelByFamilyAndSuiteAction<FS>) => void;
// export { modelByFamilyAndSuite };