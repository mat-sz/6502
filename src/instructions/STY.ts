import { State } from '../';

export default function STY (state: State, operand: number, setOperand: (value: number) => State) {
    return setOperand(state.Y);
};