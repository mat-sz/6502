import { State } from '../';

export default function STX (state: State, operand: number, setOperand: (value: number) => State) {
    return setOperand(state.X);
};