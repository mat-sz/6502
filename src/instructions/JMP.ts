import { State } from '../';
import { InstructionProps } from '../Utils';

export default function JMP (state: State, { address }: InstructionProps) {
    state.PC = address;
    return state;
};