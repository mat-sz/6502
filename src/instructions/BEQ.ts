import { State } from '../';

export default function BEQ (state: State, operand: number) {
    if (state.ZF) {
        state.PC += operand;
    }

    return state;
};