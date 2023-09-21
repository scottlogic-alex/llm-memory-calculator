// import { OptimizerFamily } from './optimizer-family';
import type { AdamConfig } from './adam-config';

export type OptimizerConfig = AdamConfig;

// export const optimizers = {
//   [OptimizerFamily.Adam]: llama1Models,
// } as const satisfies {
//   [family in OptimizerFamily]: OptimizerConfig;
// };