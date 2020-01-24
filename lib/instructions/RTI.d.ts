import { State } from '../';
import { InstructionProps } from '../Utils';
export default function RTI(state: State, { popByte, popWord }: InstructionProps): State;
