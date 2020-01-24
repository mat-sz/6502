"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EOR(state, _a) {
    var operand = _a.operand;
    var value = (state.A ^ operand);
    state.ZF = (value & 0xFF) === 0x00;
    state.NF = (value & 0x80) === 0x80;
    state.A = value;
    return state;
}
exports.default = EOR;
;
