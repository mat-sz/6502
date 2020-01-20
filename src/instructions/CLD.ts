import { State } from '../';

export default function CLD (state: State, operand: number) {
    state.DF = false;
    return state;
};