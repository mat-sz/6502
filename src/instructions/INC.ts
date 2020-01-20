import { State } from '../';

export default function INC (state: State, operand: number, setOperand: (value: number) => State) {
    let value = operand + 1;

    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;

    return setOperand(value);
};