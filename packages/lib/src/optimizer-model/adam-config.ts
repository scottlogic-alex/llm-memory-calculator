import { OptimizerFamily } from './optimizer-family';
import type { AbstractOptimizerConfig } from './optimizer-config-abstract';

// export enum AdamVariant {
//     AdamW = 'AdamW',
// }

export enum AdamDataType {
    float32 = '32-bit',
    int8 = '8-bit',
}

export interface AdamAbstractConfig<D extends AdamDataType> extends AbstractOptimizerConfig<OptimizerFamily.Adam> {
    dtype: D;
}

export type Adam32BitConfig = AdamAbstractConfig<AdamDataType.float32>;
export type Adam8BitConfig = AdamAbstractConfig<AdamDataType.int8>;

export type AdamConfig = Adam8BitConfig | Adam32BitConfig;

const abstractOptimizerConfig: AbstractOptimizerConfig<OptimizerFamily.Adam> = {
    family: OptimizerFamily.Adam
};

export const getAdamConfig = (dtype: AdamDataType): AdamConfig => {
    switch(dtype) {
        case AdamDataType.float32:
            return {
                dtype: AdamDataType.float32,
                ...abstractOptimizerConfig
            } as const satisfies Adam32BitConfig;
        case AdamDataType.int8:
            return {
                dtype: AdamDataType.int8,
                ...abstractOptimizerConfig
            } as const satisfies Adam8BitConfig;
        default:
            throw new Error(`Unimplemented AdamDataType: ${dtype satisfies never}`);
    }
};