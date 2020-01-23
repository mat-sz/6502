import { State } from '../';
import { setSR } from '../Utils';
import { InstructionProps } from '../Utils';

export default function RTI (state: State, { popByte, popWord }: InstructionProps) {
    state = setSR(state, popByte());
    state.PC = popWord() - 1; // 1 is added later on from the byte count of the instruction
    return state;
};