import { State } from '../';
import { InstructionProps } from '../Utils';

export default function STA (state: State, { setOperand }: InstructionProps) {
    setOperand(state.A);
    return state;
};