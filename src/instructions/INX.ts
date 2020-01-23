import { State } from '../';
import { InstructionProps } from '../Utils';

export default function INX (state: State, { operand }: InstructionProps) {
    state.X++;

    state.ZF = (state.X & 0xFF) === 0x00;
    state.NF = (state.X & 0x80) === 0x80;

    return state;
};