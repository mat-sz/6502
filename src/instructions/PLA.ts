import { State } from '../';
import { popByte } from '../InstructionSet';

export default function PLA (state: State, operand: number) {
    state.A = popByte(state);
    state.ZF = (state.A & 0xFF) === 0x00;
    state.NF = (state.A & 0x80) === 0x80;
    return state;
};