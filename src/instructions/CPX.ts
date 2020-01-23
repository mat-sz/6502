import { State } from '../';
import { InstructionProps } from '../Utils';

export default function CPX (state: State, { operand }: InstructionProps) {
    let value = state.X - operand;

    state.CF = state.X >= operand;
    state.ZF = state.X === operand;
    state.NF = (value & 0x80) === 0x80;

    return state;
};