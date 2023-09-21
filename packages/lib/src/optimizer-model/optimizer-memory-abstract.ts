import type { OptimizerFamily } from './optimizer-family';

export interface AbstractOptimizerMemory<F extends OptimizerFamily> {
    family: F;
}