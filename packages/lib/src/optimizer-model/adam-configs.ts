import type { OptimizerFamily } from './optimizer-family';
import type { AbstractOptimizerConfig } from './optimizer-config-abstract';

// export enum AdamVariant {
//     AdamW = 'AdamW',
// }

export enum AdamDataTypes {
    float32 = '32-bit',
    int8 = '8-bit',
}

export interface AdamAbstractConfig<D extends AdamDataTypes> extends AbstractOptimizerConfig<OptimizerFamily.Adam> {
    dtype: D;
}

export type Adam32Bit = AbstractOptimizerConfig<OptimizerFamily.Adam>;

export interface Adam8Bit extends AbstractOptimizerConfig<OptimizerFamily.Adam> {
    doubleQuant: boolean;
}

export type AdamConfig = Adam8Bit | Adam32Bit;