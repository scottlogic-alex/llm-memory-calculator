import type { OptimizerFamily } from './optimizer-family';

export interface AbstractOptimizerConfig<F extends OptimizerFamily> {
    family: F;
}