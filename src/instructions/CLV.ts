import { State } from '../';

export default function CLV (state: State, operand: number) {
    state.VF = false;
    return state;
};