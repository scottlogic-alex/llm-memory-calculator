import { writable, type Writable } from 'svelte/store';

export const useMixedPrecision: Writable<boolean> = writable(true);