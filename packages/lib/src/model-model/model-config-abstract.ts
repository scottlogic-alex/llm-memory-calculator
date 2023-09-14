import type { ModelFamily } from './model-family';

export interface AbstractModelConfig<F extends ModelFamily> {
    family: F;
}