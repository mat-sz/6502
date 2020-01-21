import { State } from '../';
import { performIRQ } from '../Utils';

export default function BRK (state: State, operand: number) {
    state.PC += 2;
    performIRQ(state, 0xFFFE, true);
    return state;
};