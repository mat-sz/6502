"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BCS(state, _a) {
    var address = _a.address;
    if (state.CF) {
        state.PC = address;
    }
    return state;
}
exports.default = BCS;
;
