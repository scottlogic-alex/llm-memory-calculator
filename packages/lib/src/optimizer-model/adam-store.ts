import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { type AdamConfig, AdamDataType, type Adam32BitConfig, type Adam8BitConfig } from './adam-configs';
import type { AbstractOptimizerConfig } from './optimizer-config-abstract';
import { OptimizerFamily } from './optimizer-family';

export const adamDtype: Writable<AdamDataType> = writable(AdamDataType.float32);

const abstractOptimizerConfig: AbstractOptimizerConfig<OptimizerFamily.Adam> = {
    family: OptimizerFamily.Adam
};

export const adamConfig: Readable<AdamConfig> = derived(
    adamDtype,
    (dtype: AdamDataType): AdamConfig => {
        switch(dtype) {
            case AdamDataType.float32:
                return { ...abstractOptimizerConfig } as const satisfies Adam32BitConfig;
            case AdamDataType.int8:
                return { ...abstractOptimizerConfig } as const satisfies Adam8BitConfig;
            default:
                throw new Error(`Unimplemented AdamDataType: ${dtype satisfies never}`);
        }
    }
);