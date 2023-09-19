import { derived, type Readable } from 'svelte/store';
import type { ModelFamily } from '../model-model/model-family';
import type { ModelConfig } from '../model-model/model-db';
import { models } from '../model-model/model-db';
import {
    family,
    suiteChoiceByFamily,
    modelChoiceByFamilyAndSuite,
    type SuiteChoiceByFamily,
    type ModelChoiceByFamilyAndSuite
} from './model-choice';

export const modelConfig: Readable<ModelConfig> = derived([
    family,
    suiteChoiceByFamily,
    modelChoiceByFamilyAndSuite,
    ], ([
        family_,
        suiteChoiceByFamily_,
        modelChoiceByFamilyAndSuite_
    ]: [
        ModelFamily,
        SuiteChoiceByFamily,
        ModelChoiceByFamilyAndSuite
    ]): ModelConfig =>
        models[family_][suiteChoiceByFamily_[family_]][modelChoiceByFamilyAndSuite_[suiteChoiceByFamily_[family_]]]
    );