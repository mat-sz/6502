import { State } from '../';
import { performIRQ } from '../InstructionSet';

export default function BRK (state: State, operand: number) {
    state.PC += 2;
    performIRQ(state, 0xFFFE, true);
    return state;
};