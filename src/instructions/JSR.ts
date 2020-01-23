import { State } from '../';
import { InstructionProps } from '../Utils';

export default function JSR (state: State, { address, pushWord }: InstructionProps) {
    pushWord(state.PC + 2);
    state.PC = address;
    return state;
};