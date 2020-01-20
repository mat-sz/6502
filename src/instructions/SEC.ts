import { State } from '../';

export default function SEC (state: State, operand: number) {
    state.CF = true;
    return state;
};