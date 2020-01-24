"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function JMP(state, _a) {
    var address = _a.address;
    state.PC = address;
    return state;
}
exports.default = JMP;
;
