import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BMI (state: State, { address }: InstructionProps) {
    if (state.NF) {
        state.PC = address;
    }

    return state;
};