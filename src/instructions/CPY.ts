import { State } from '../';

export default function CPY (state: State, operand: number) {
    let value = state.Y - operand;

    state.CF = state.Y >= operand;
    state.ZF = state.Y === operand;
    state.NF = (value & 0x80) === 0x80;

    return state;
};