import { State } from '../';

export default function BCS (state: State, operand: number) {
    if (state.CF) {
        state.PC += operand;
    }

    return state;
};