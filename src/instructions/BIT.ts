import { State } from '../';

export default function BIT (state: State, operand: number) {
    let value = state.A & operand;

    state.NF = (operand & 0x80) === 0x80;
    state.VF = (operand & 0x40) === 0x40;
    state.ZF = (value & 0xFF) === 0x00;

    return state;
};