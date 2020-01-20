import { State } from '../';

export default function BVC (state: State, operand: number) {
    if (!state.VF) {
        state.PC = operand;
    }

    return state;
};