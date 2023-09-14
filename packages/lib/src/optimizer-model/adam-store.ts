import { writable, derived, type Writable, type Readable } from 'svelte/store';
import { type AdamConfig, AdamDataType, type Adam32BitConfig, type Adam8BitConfig } from './adam-configs';
import type { AbstractOptimizerConfig } from './optimizer-config-abstract';
import { OptimizerFamily } from './optimizer-family';

export const adamDtype: Writable<AdamDataType> = writable(AdamDataType.float32);
export const adam8BitDoubleQuant: Writable<boolean> = writable(false);

const abstractOptimizerConfig: AbstractOptimizerConfig<OptimizerFamily.Adam> = {
    family: OptimizerFamily.Adam
};

export const adamConfig: Readable<AdamConfig> = derived(
    [adamDtype, adam8BitDoubleQuant],
    ([dtype, doubleQuant]: [AdamDataType, boolean]): AdamConfig => {
    switch(dtype) {
        case AdamDataType.float32:
            return { ...abstractOptimizerConfig } as const satisfies Adam32BitConfig;
        case AdamDataType.int8:
            return {
                ...abstractOptimizerConfig,
                doubleQuant,
            } as const satisfies Adam8BitConfig;
        default:
            throw new Error(`Unimplemented AdamDataType: ${dtype satisfies never}`);
    }
})