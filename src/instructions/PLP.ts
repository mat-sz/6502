import { State } from '../';
import { setSR } from '../Utils';
import { InstructionProps } from '../Utils';

export default function PLP (state: State, { popByte }: InstructionProps) {
    return setSR(state, popByte());
};