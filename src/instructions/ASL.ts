import { State } from '../';
import { InstructionProps } from '../Utils';

export default function ASL (state: State, { operand, setOperand }: InstructionProps) {
    state.CF = operand >= 0x80;

    let value = operand << 1;

    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;

    setOperand(value);
    return state;
};