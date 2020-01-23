import { State } from '../';
import { decodeBCD, encodeBCD } from '../Utils';
import { InstructionProps } from '../Utils';

export default function SBC (state: State, { operand }: InstructionProps) {
    let value = 0;
    if (state.DF) {
        value = decodeBCD(state.A) - decodeBCD(operand);
        if (!state.CF) value--;

        state.CF = value >= 0;
        if (value < 0) value += 100;
        
        state.ZF = value === 0;
        value = encodeBCD(value);
        state.NF = value > 0x7f;
    } else {
        value = (state.A + ~operand);
        if (state.CF) value++;
    
        state.CF = state.A + (state.CF ? 1 : 0) > operand;
        state.ZF = (value & 0xFF) === 0x00;
        state.NF = (value & 0x80) === 0x80;
        state.VF = (~(state.A ^ ~operand) & (state.A ^ value) & 0x80) !== 0x00;
    }

    state.A = value;

    return state;
};