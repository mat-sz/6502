import { State } from '../';

export default function TXS (state: State) {
    state.SP = state.X;
    return state;
};