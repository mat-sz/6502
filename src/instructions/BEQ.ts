import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BEQ (state: State, { address }: InstructionProps) {
    if (state.ZF) {
        state.PC = address;
    }

    return state;
};