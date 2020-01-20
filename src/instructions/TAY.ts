import { State } from '../';

export default function TAY (state: State, operand: number) {
    state.Y = state.A;

    state.ZF = (state.Y & 0xFF) === 0x00;
    state.NF = (state.Y & 0x80) === 0x80;

    return state;
};