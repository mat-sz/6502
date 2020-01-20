import { State } from '../';

export default function JMP (state: State, operand: number) {
    state.PC = operand;

    return state;
};