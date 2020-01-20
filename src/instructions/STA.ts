import { State } from '../';

export default function STA (state: State, operand: number, setOperand: (value: number) => State) {
    return setOperand(state.A);
};