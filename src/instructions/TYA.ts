import { State } from '../';

export default function TYA (state: State) {
    state.A = state.Y;

    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;

    return state;
};