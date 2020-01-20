import { State } from '../';
import { pushWord } from '../InstructionSet';

export default function JSR (state: State, operand: number) {
    state.PC = operand;
    return pushWord(state, state.PC + 2);
};