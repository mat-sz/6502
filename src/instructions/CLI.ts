import { State } from '../';

export default function CLI (state: State, operand: number) {
    state.IF = false;
    return state;
};