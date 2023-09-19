// import { derived, type Readable } from 'svelte/store';
// import type { ModelConfig } from '../model-model/model-db';
// import type { ModelSuite } from '../model-model/model-suite';
// import { models } from '../model-model/model-db';
// import { modelSuite, modelChoiceBySuite, type ModelChoiceBySuite } from './model-choice';
// import { modelFamily } from './model-family';

// export const modelConfig: Readable<ModelConfig> = derived([
//     modelSuite,
//     modelChoiceBySuite,
//     ], <Suite extends ModelSuite>([modelSuite, modelChoiceBySuite]: [Suite, ModelChoiceBySuite]): ModelConfig => {
//         // const x = modelChoiceBySuite[modelSuite as ModelSuite];
//         // type X = ModelChoiceBySuite[ModelSuite.Llama1];
//         const modelChoice: ModelChoiceBySuite[Suite] = modelChoiceBySuite[modelSuite];
//         return models[modelSuite][modelChoice];
//     },
// );
// $: modelConfig = models[$modelSuite][$modelChoiceBySuite[$modelSuite]];