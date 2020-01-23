import { State } from '../';
import { getSR } from '../Utils';
import { InstructionProps } from '../Utils';

export default function PHP (state: State, { pushByte }: InstructionProps) {
    pushByte(getSR(state, true));
    return state;
};