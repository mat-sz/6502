import { State } from '../';
import { decodeBCD, encodeBCD, InstructionProps } from '../Utils';

export default function ADC (state: State, { operand }: InstructionProps) {
    let value = 0;
    if (state.DF) {
        value = decodeBCD(state.A) + decodeBCD(operand);
        if (state.CF) value++;
    
        state.CF = (value > 99);
        if (value > 99) value -= 100;

        state.ZF = value === 0;
        value = encodeBCD(value);
        state.NF = (value > 0x7F);
    } else {
        value = (state.A + operand);
        if (state.CF) value++;
    
        state.CF = value > 0xFF;
        state.ZF = (value & 0xFF) === 0x00;
        state.NF = (value & 0x80) === 0x80;
        state.VF = (~(state.A ^ operand) & (state.A ^ value) & 0x80) !== 0x00;
    }

    state.A = value;

    return state;
};