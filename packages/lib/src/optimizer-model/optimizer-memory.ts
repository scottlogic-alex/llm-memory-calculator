import { getAdamBytesPerParam, type AdamMemory } from './adam-memory';
import type { OptimizerConfig } from './optimizer-db';
import { OptimizerFamily } from './optimizer-family';

export type OptimizerMemory = AdamMemory;

export const getOptimizerMemory = (config: OptimizerConfig): OptimizerMemory => {
    switch(config.family) {
        case OptimizerFamily.Adam:
            return {
                family: OptimizerFamily.Adam,
                bytesPerParam: getAdamBytesPerParam(config),
            } as const satisfies OptimizerMemory;
        default:
            throw new Error(`Unimplemented OptimizerFamily: ${config.family satisfies never}`);
    }
};