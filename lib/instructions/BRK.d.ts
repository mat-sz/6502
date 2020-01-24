import { State } from '../';
import { InstructionProps } from '../Utils';
export default function BRK(state: State, { performIRQ }: InstructionProps): State;
