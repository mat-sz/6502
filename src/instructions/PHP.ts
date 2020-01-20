import { State } from '../';
import { pushByte, getSR } from '../InstructionSet';

export default function PHP (state: State, operand: number) {
    return pushByte(state, getSR(state, true));
};