import { State } from '../';
import { InstructionProps } from '../Utils';

export default function CMP (state: State, { operand }: InstructionProps) {
    let value = state.A - operand;

    state.CF = state.A >= operand;
    state.ZF = state.A === operand;
    state.NF = (value & 0x80) === 0x80;

    return state;
};