"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function BMI(state, _a) {
    var address = _a.address;
    if (state.NF) {
        state.PC = address;
    }
    return state;
}
exports.default = BMI;
;
