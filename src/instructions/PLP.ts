import { State } from '../';
import { popByte, setSR } from '../InstructionSet';

export default function PLP (state: State, operand: number) {
    return setSR(state, popByte(state));
};