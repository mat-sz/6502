import { State } from '../';

export default function BMI (state: State, operand: number) {
    if (state.NF) {
        state.PC = operand;
    }

    return state;
};