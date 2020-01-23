import { State } from '../';
import { InstructionProps } from '../Utils';

export default function RTS (state: State, { popWord }: InstructionProps) {
    state.PC = popWord();
    return state;
};