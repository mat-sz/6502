"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instructionSet_1 = require("./instructionSet");
var Utils_1 = require("./Utils");
exports.MEMORY_SIZE = 65536;
var State = /** @class */ (function () {
    function State() {
        this.PC = 0; // Program counter
        this.SP = 0; // Stack pointer
        this.A = 0; // Accumulator
        this.X = 0; // X index
        this.Y = 0; // Y index
        this.NF = false; // Negative flag
        this.VF = false; // Overflow flag
        this.DF = false; // Decimal flag
        this.IF = true; // Interrupt flag
        this.ZF = false; // Zero flag
        this.CF = false; // Carry flag
        this.NMI = false;
        this.IRQ = false;
        this.cycles = 0; // Count of cycles spent on an instruction,
        // is reset on step().
    }
    return State;
}());
exports.State = State;
;
/**
 * Executes next instruction.
 * @param state CPU state to use.
 * @param getMemory Function that returns a given byte for a given offset.
 * @param setMemory Function that sets a byte for a given offset.
 * @returns State
 */
exports.step = function (state, getMemory, setMemory) {
    state.cycles = 0;
    var code = getMemory(state.PC);
    if (code in instructionSet_1.default) {
        state = instructionSet_1.default[code].fn(state, getMemory, setMemory);
    }
    else {
        throw new Error('Unsupported opcode. ' + code.toString(16) + ' at ' + state.PC.toString(16));
    }
    // Handle NMI and IRQ
    if (state.NMI) {
        Utils_1.performIRQ(state, getMemory, setMemory, 0xFFFA);
        state.NMI = false;
    }
    else if (!state.IF && state.IRQ) {
        Utils_1.performIRQ(state, getMemory, setMemory, 0xFFFE);
        state.NMI = false;
    }
    return state;
};
