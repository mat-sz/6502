import { State } from '../';
import { InstructionProps } from '../Utils';

export default function CPY (state: State, { operand }: InstructionProps) {
    let value = state.Y - operand;

    state.CF = state.Y >= operand;
    state.ZF = state.Y === operand;
    state.NF = (value & 0x80) === 0x80;

    return state;
};