import { State } from '../';
import { popByte } from '../InstructionSet';

export default function PLA (state: State, operand: number) {
    state.A = popByte(state);
    return state;
};