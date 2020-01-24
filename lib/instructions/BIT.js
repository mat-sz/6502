"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BIT(state, _a) {
    var operand = _a.operand;
    var value = state.A & operand;
    state.NF = (operand & 0x80) === 0x80;
    state.VF = (operand & 0x40) === 0x40;
    state.ZF = (value & 0xFF) === 0x00;
    return state;
}
exports.default = BIT;
;
