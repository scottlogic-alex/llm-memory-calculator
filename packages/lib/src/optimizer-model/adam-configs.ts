import type { OptimizerFamily } from './optimizer-family';
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

export type Adam32BitConfig = AbstractOptimizerConfig<OptimizerFamily.Adam>;

export interface Adam8BitConfig extends AbstractOptimizerConfig<OptimizerFamily.Adam> {
    doubleQuant: boolean;
}

export type AdamConfig = Adam8BitConfig | Adam32BitConfig;