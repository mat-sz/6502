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
        exports.performIRQ(state, getMemory, setMemory, 0xFFFA);
        state.NMI = false;
    }
    else if (!state.IF && state.IRQ) {
        exports.performIRQ(state, getMemory, setMemory, 0xFFFE);
        state.IRQ = false;
    }
    return state;
};
/**
 * Performs an interrupt.
 * @param state CPU state to use.
 * @param getMemory Function that returns a given byte for a given offset.
 * @param setMemory Function that sets a byte for a given offset.
 * @param offset Reset vector
 * @param brk Is a BRK
 * @param push Should push PC and SR?
 */
exports.performIRQ = function (state, getMemory, setMemory, offset, brk, push) {
    if (brk === void 0) { brk = false; }
    if (push === void 0) { push = true; }
    if (push) {
        Utils_1.pushWord(state, setMemory, state.PC);
        Utils_1.pushByte(state, setMemory, Utils_1.getSR(state, brk));
    }
    state.IF = true;
    state.PC = Utils_1.getWord(state, getMemory, offset);
    return state;
};
/**
 * Performs a reset.
 * @param state CPU state to use.
 * @param getMemory Function that returns a given byte for a given offset.
 * @param setMemory Function that sets a byte for a given offset.
 */
exports.performReset = function (getMemory) {
    var state = exports.performIRQ(new State(), getMemory, function (_) { return 0; }, 0xFFFC, false, false);
    state.SP = 0xFD;
    return state;
};
