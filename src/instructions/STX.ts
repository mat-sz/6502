import { State } from '../';
import { InstructionProps } from '../Utils';

export default function STX (state: State, { setOperand }: InstructionProps) {
    setOperand(state.X);
    return state;
};