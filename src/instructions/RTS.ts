import { State } from '../';
import { popWord } from '../InstructionSet';

export default function RTS (state: State, operand: number) {
    state.PC = popWord(state) + 1;
    return state;
};