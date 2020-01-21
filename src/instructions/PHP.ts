import { State } from '../';
import { pushByte, getSR } from '../Utils';

export default function PHP (state: State, operand: number) {
    return pushByte(state, getSR(state, true));
};