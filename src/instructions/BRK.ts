import { State } from '../';
import { InstructionProps } from '../Utils';

export default function BRK (state: State, { performIRQ }: InstructionProps) {
    state.PC += 2;
    performIRQ(0xFFFE, true);
    return state;
};