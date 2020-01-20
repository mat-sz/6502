import { State } from '../';

export default function SED (state: State, operand: number) {
    state.DF = true;
    return state;
};