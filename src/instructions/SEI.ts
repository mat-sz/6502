import { State } from '../';

export default function SEI (state: State, operand: number) {
    state.IF = true;
    return state;
};