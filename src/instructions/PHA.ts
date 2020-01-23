import { State } from '../';
import { InstructionProps } from '../Utils';

export default function PHA (state: State, { pushByte }: InstructionProps) {
    pushByte(state.A);
    return state;
};