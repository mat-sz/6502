import { State } from '../';
import { setSR, popByte, popWord } from '../InstructionSet';

export default function RTI (state: State, operand: number) {
    state = setSR(state, popByte(state));
    state.PC = popWord(state);
    return state;
};