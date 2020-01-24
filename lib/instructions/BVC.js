"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BVC(state, _a) {
    var address = _a.address;
    if (!state.VF) {
        state.PC = address;
    }
    return state;
}
exports.default = BVC;
;
