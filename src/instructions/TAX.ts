import { State } from '../';

export default function TAX (state: State, operand: number) {
    state.X = state.A;

    state.ZF = (state.X & 0xFF) === 0x00;
    state.NF = (state.X & 0x80) === 0x80;

    return state;
};