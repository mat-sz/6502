import { State } from '../';
import { InstructionProps } from '../Utils';

export default function DEY (state: State, { operand }: InstructionProps) {
    state.Y--;

    state.ZF = (state.Y & 0xFF) === 0x00;
    state.NF = (state.Y & 0x80) === 0x80;

    return state;
};