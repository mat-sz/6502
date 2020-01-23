import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BPL (state: State, { address }: InstructionProps) {
    if (!state.NF) {
        state.PC = address;
    }

    return state;
};