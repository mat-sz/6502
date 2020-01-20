import { State } from '../';

export default function SBC (state: State, operand: number) {
    let value = (state.A - operand);
    if (state.CF) value++;

    state.CF = (value > 0xFF);
    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;
    state.VF = (~(state.A ^ operand) & (state.A ^ value) & 0x80) !== 0x00;

    state.A = value;

    return state;
};