import { writable, type Readable } from 'svelte/store';

export type Reducer<State, Action> = (state: State, action: Action) => State;
export type Dispatch<Action> = (action: Action) => void;
export type Reducible<State, Action> = [
  readable: Readable<State>,
  dispatch: Dispatch<Action>
];

export const reducible = <State, Action>(
  state: State,
  reducer: Reducer<State, Action>,
): Reducible<State, Action> => {
  const { update, subscribe } = writable(state);
  
  const dispatch: Dispatch<Action> = (action: Action): void =>
    void update(state => reducer(state, action));
  
  const readable_: Readable<State> = { subscribe };
  return [readable_, dispatch];
};