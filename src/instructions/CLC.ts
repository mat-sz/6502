import { State } from '../';

export default function CLC (state: State) {
    state.CF = false;
    return state;
};