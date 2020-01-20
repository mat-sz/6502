import { State } from '.';

import ADC from './instructions/ADC';

export enum InstructionType {
    ADC, // Add with carry
    AND, // And with A
    ASL, // Ariithmetic shift left
    BCC, // Branch on carry clear
    BCS, // Branch on carry set
    BEQ, // Branch on equal
    BIT, // Bit test
    BMI, // Branch on minus
    BNE, // Branch on not equal
    BPL, // Branch on plus
    BRK, // Break
    BVC, // Branch on overflow clear
    BVS, // Branch on overflow set
    CLC, // Clear carry
    CLD, // Clear decimal
    CLI, // Clear interrupt disable
    CLV, // Clear overflow
    CMP, // Compare with A
    CPX, // Compare with X
    CPY, // Compare with Y
    DEC, // Decrement A
    DEX, // Decrement X
    DEY, // Decrement Y
    EOR, // XOR with A
    INC, // Increment A
    INX, // Increment X
    INY, // Increment Y
    JMP, // Jump
    JSR, // Jump subroutine
    LDA, // Load acumulator
    LDX, // Load X
    LDY, // Load Y
    LSR, // Logical shift right
    NOP, // No operation
    ORA, // Or with A
    PHA, // Push A
    PHP, // Push SR
    PLA, // Pull A
    PLP, // Pull SR
    ROL, // Rotate left
    ROR, // Rotate right
    RTI, // Return from interrupt
    RTS, // Return from subroutine
    SBC, // Subtract with carry
    SEC, // Set carry
    SED, // Set decimal
    SEI, // Set interrupt disable
    STA, // Store A
    STX, // Store X
    STY, // Store Y
    TAX, // Transfer A to X
    TAY, // Transfer A to Y
    TSX, // Transfer SP to X
    TXA, // Transfer X to A
    TXS, // Transfer X to SP
    TYA, // Transfer Y to A
};

export enum AddressMode {
    ACCUMULATOR, // Operand is A
    ABSOLUTE,    // Operand is address $HHLL
    ABSOLUTE_X,  // Operand is address incremented by X with carry
    ABSOLUTE_Y,  // Operand is address incremented by Y with carry
    IMMEDIATE,   // Operand is byte BB
    IMPLIED,     // Operand implied
    INDIRECT,    // Operand is address from the contents of a word at the given address; C.w($HHLL)
    INDIRECT_X,  // Operand is zeropage address; C.w($00LL + X)
    INDIRECT_Y,  // Operand is zeropage address; C.w($00LL) + Y
    RELATIVE,    // Branch target is PC + signed offset BB
    ZEROPAGE,    // Operand is zeropage address $00LL
    ZEROPAGE_X,  // Operand is zeropage address incremented by X without carry
    ZEROPAGE_Y,  // Operand is zeropage address incremented by Y without carry
};

// Pure functions for state changes to make debugging easier.
export type InstructionFunction = (state: State) => State;

export interface Instruction {
    addressMode: AddressMode,
    bytes: number,
    fn: InstructionFunction,
};

const getWord = (state: State, offset: number) => ((state.memory[offset + 1] << 8 | state.memory[offset]) & 0xFFFF);
const getImmediateWord = (state: State) => getWord(state, state.PC + 1);
const getImmediateByte = (state: State) => state.memory[state.PC + 1];

const getOperand = (state: State, mode: AddressMode) => {
    switch (mode) {
        case AddressMode.ACCUMULATOR:
            return state.A;
        case AddressMode.ABSOLUTE:
            return state.memory[getImmediateWord(state)];
        case AddressMode.ABSOLUTE_X:
            return state.memory[getImmediateWord(state) + state.X];
        case AddressMode.ABSOLUTE_Y:
            return state.memory[getImmediateWord(state) + state.Y];
        case AddressMode.IMMEDIATE:
            return getImmediateByte(state);
        case AddressMode.IMPLIED:
            return 0;
        case AddressMode.INDIRECT:
            return state.memory[getWord(state, getImmediateWord(state))];
        case AddressMode.INDIRECT_X:
            return state.memory[getWord(state, getImmediateWord(state) + state.X)];
        case AddressMode.INDIRECT_Y:
            return state.memory[getWord(state, getImmediateWord(state)) + state.Y];
        case AddressMode.RELATIVE:
            // << 24 >> 24 is a quick conversion to signed
            return state.memory[state.PC + (getImmediateByte(state) << 24 >> 24)];
        case AddressMode.ZEROPAGE:
            return state.memory[getImmediateByte(state)];
        case AddressMode.ZEROPAGE_X:
            return state.memory[(getImmediateByte(state) + state.X) & 0xff];
        case AddressMode.ZEROPAGE_Y:
            return state.memory[(getImmediateByte(state) + state.Y) & 0xff];
        default:
            return 0;
    }
};

const createInstruction = (fn: (state: State, operand: number) => State, addressMode: AddressMode, bytes: number) => {
    return {
        addressMode: addressMode,
        bytes: bytes,
        fn: (state: State) => {
            const operand = getOperand(state, addressMode);
    
            const result = fn(state, operand);
            result.PC += bytes;
            
            return result;
        }
    } as Instruction;
};

let instructionSet: Instruction[] = [];

// Based on: https://www.masswerk.at/6502/6502_instruction_set.html

instructionSet[0x69] = createInstruction(ADC, AddressMode.IMMEDIATE,  2);
instructionSet[0x65] = createInstruction(ADC, AddressMode.ZEROPAGE,   2);
instructionSet[0x75] = createInstruction(ADC, AddressMode.ZEROPAGE_X, 2);
instructionSet[0x6D] = createInstruction(ADC, AddressMode.ABSOLUTE,   3);
instructionSet[0x7D] = createInstruction(ADC, AddressMode.ABSOLUTE_X, 3);
instructionSet[0x79] = createInstruction(ADC, AddressMode.ABSOLUTE_Y, 3);
instructionSet[0x61] = createInstruction(ADC, AddressMode.INDIRECT_X, 2);
instructionSet[0x71] = createInstruction(ADC, AddressMode.INDIRECT_Y, 2);

export default instructionSet;