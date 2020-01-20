import { State } from '../';

export default function TXS (state: State, operand: number) {
    state.SP = state.X;
    return state;
};