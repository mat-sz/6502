import { State } from '../';

export default function BPL (state: State, operand: number) {
    if (!state.NF) {
        state.PC = operand;
    }

    return state;
};