import { State } from '../';
import { InstructionProps } from '../Utils';

export default function EOR (state: State, { operand }: InstructionProps) {
    let value = (state.A ^ operand);

    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;

    state.A = value;

    return state;
};