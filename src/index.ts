import instructionSet from './instructionSet';
import { pushWord, pushByte, getSR, getWord, GetMemoryFunction, SetMemoryFunction } from './Utils';
export const MEMORY_SIZE = 65536;

export class State {
    PC = 0; // Program counter
    SP = 0; // Stack pointer
    
    A = 0; // Accumulator
    X = 0; // X index
    Y = 0; // Y index

    NF = false; // Negative flag
    VF = false; // Overflow flag
    DF = false; // Decimal flag
    IF = true;  // Interrupt flag
    ZF = false; // Zero flag
    CF = false; // Carry flag

    NMI = false;
    IRQ = false;

    cycles = 0; // Count of cycles spent on an instruction,
                // is reset on step().
};

/**
 * Executes next instruction.
 * @param state CPU state to use.
 * @param getMemory Function that returns a given byte for a given offset.
 * @param setMemory Function that sets a byte for a given offset.
 * @returns State
 */
export const step = (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction) => {
    state.cycles = 0;
    
    const code = getMemory(state.PC);
    if (code in instructionSet) {
        state = instructionSet[code].fn(state, getMemory, setMemory);
    } else {
        throw new Error('Unsupported opcode. ' + code.toString(16) + ' at ' + state.PC.toString(16));
    }

    // Handle NMI and IRQ
    if (state.NMI) {
        performIRQ(state, getMemory, setMemory, 0xFFFA);
        state.NMI = false;
    } else if (!state.IF && state.IRQ) {
        performIRQ(state, getMemory, setMemory, 0xFFFE);
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
 */
export const performIRQ = (state: State, getMemory: GetMemoryFunction, setMemory: SetMemoryFunction, offset: number, brk = false) => {
    pushWord(state, setMemory, state.PC);
    pushByte(state, setMemory, getSR(state, brk));
    state.IF = true;
    state.PC = getWord(state, getMemory, offset);
    return state;
};