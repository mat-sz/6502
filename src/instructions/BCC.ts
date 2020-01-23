import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BCC (state: State, { address }: InstructionProps) {
    if (!state.CF) {
        state.PC = address;
    }

    return state;
};