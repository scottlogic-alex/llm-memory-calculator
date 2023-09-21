import { derived, type Readable } from 'svelte/store';
import type { ModelConfig } from '../model-model/model-db';
import { models } from '../model-model/model-db';
import {
    familyAndSuite,
    modelByFamilyAndSuite,
    type FamilyAndSuite,
    type ModelByFamilyAndSuite,
} from './model-choice';

export const modelConfig: Readable<ModelConfig> = derived(
    [
        familyAndSuite,
        modelByFamilyAndSuite,
    ],
    ([
        { family, suite },
        modelByFamilyAndSuite,
    ]: [
        FamilyAndSuite,
        ModelByFamilyAndSuite,
    ]): ModelConfig =>
        models[family][suite][modelByFamilyAndSuite[family][suite]]
    );