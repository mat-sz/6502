import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BVS (state: State, { address }: InstructionProps) {
    if (state.VF) {
        state.PC = address;
    }

    return state;
};