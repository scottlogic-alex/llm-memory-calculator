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

export interface ModelByFamilyAndSuite<
    FS extends FamilyAndSuite = FamilyAndSuite
> {
    fs: FS,
    model: keyof (typeof models)[FS['family']][FS['suite']],
}

export const modelsByFamilyAndSuite: ModelByFamilyAndSuite[] = 
    Object.values(familyAndSuitesByFamily)
    .flatMap<ModelByFamilyAndSuite>(
        (fss: FamilyAndSuite[]): ModelByFamilyAndSuite[] =>
            fss.flatMap<ModelByFamilyAndSuite>(
                <FS extends FamilyAndSuite>(fs: FS): ModelByFamilyAndSuite<FS>[] => {
                    const modelsInSuite = Object.keys(models[fs.family][fs.suite]) as Array<ModelByFamilyAndSuite<FS>['model']>;
                    return modelsInSuite.map<ModelByFamilyAndSuite<FS>>(
                        <M extends keyof (typeof models)[FS['family']][FS['suite']]>(model: M) => ({fs, model})
                    );
                }
            )
    );

export const modelByFamilyAndSuite: Writable<ModelByFamilyAndSuite> = writable(modelsByFamilyAndSuite.filter(({ fs }) => fs === initialFamilyAndSuite)[0]);