import { MasterWeightPrecision } from '../master-weights-model/master-weights';
import { writable, type Writable } from 'svelte/store';

export const masterWeightPrecision: Writable<MasterWeightPrecision> = writable(MasterWeightPrecision.float);