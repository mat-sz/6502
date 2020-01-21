import { State } from '../';
import { popWord } from '../Utils';

export default function RTS (state: State, operand: number) {
    state.PC = popWord(state);
    return state;
};