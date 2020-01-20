import { State } from '../';

export default function BVS (state: State, operand: number) {
    if (state.VF) {
        state.PC = operand;
    }

    return state;
};