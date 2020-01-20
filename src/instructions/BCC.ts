import { State } from '../';

export default function BCC (state: State, operand: number) {
    if (!state.CF) {
        state.PC = operand;
    }

    return state;
};