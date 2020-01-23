import { State } from '../';
import { InstructionProps } from '../Utils';

export default function ROL (state: State, { operand, setOperand }: InstructionProps) {
    let value = operand << 1;
    if (state.CF) value = value | 0x01;

    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;
    state.CF = operand >= 0x80;

    setOperand(value);
    return state;
};