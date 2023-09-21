import { derived, type Readable } from 'svelte/store';
import { countParams, type ParamCount } from '../param-model/param-count';
import { modelConfig } from '../model-store/model-config';
import type { ModelConfig } from '../model-model/model-db';

export const paramCount: Readable<ParamCount> = derived(
    modelConfig,
    (modelConfig: ModelConfig): ParamCount => countParams(modelConfig)
);