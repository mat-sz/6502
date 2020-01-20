import { State } from '../';
import { pushWord } from '../InstructionSet';

export default function JSR (state: State, operand: number) {
    state = pushWord(state, state.PC + 2);
    state.PC = operand;
    return state;
};