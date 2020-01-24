import { State } from '../';

export default function INY (state: State) {
    state.Y++;

    state.ZF = (state.Y & 0xFF) === 0x00;
    state.NF = (state.Y & 0x80) === 0x80;

    return state;
};