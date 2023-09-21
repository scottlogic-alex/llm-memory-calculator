import { writable, derived, type Writable, type Readable } from 'svelte/store';
import {
    getAdamConfig,
    AdamDataType,
    type AdamConfig,
} from '../optimizer-model/adam-config';
import { getAdamBytesPerParam, type AdamBytesPerParam } from '../optimizer-model/adam-memory';

export const adamDtype: Writable<AdamDataType> = writable(AdamDataType.float32);

export const adamConfig: Readable<AdamConfig> = derived(
    adamDtype,
    getAdamConfig,
);

export const adamBytesPerParam: Readable<AdamBytesPerParam> = derived(
    adamConfig,
    getAdamBytesPerParam,
);