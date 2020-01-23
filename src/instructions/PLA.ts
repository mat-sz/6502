import { State } from '../';
import { InstructionProps } from '../Utils';

export default function PLA (state: State, { popByte }: InstructionProps) {
    state.A = popByte();
    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;
    return state;
};