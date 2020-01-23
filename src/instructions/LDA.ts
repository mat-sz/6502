import { State } from '../';
import { InstructionProps } from '../Utils';

export default function LDA (state: State, { operand }: InstructionProps) {
    state.A = operand;

    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;

    return state;
};