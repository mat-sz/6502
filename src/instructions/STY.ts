import { State } from '../';
import { InstructionProps } from '../Utils';

export default function STY (state: State, { setOperand }: InstructionProps) {
    setOperand(state.Y);
    return state;
};