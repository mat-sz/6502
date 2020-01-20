import { State } from '../';
import { pushByte } from '../InstructionSet';

export default function PHA (state: State, operand: number) {
    return pushByte(state, state.A);
};