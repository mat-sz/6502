import { State } from '../';

export default function CLC (state: State, operand: number) {
    state.CF = false;
    return state;
};