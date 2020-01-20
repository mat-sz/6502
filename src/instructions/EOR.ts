import { State } from '../';

export default function EOR (state: State, operand: number) {
    let value = (state.A ^ operand);

    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;

    state.A = value;

    return state;
};