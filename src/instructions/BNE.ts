import { State } from '../';

export default function BNE (state: State, operand: number) {
    if (!state.ZF) {
        state.PC = operand;
    }

    return state;
};