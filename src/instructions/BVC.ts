import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BVC (state: State, { address }: InstructionProps) {
    if (!state.VF) {
        state.PC = address;
    }

    return state;
};