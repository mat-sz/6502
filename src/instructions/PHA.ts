import { State } from '../';
import { pushByte } from '../Utils';

export default function PHA (state: State, operand: number) {
    return pushByte(state, state.A);
};