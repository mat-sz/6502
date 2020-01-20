import { State } from '.';

import ADC from './instructions/ADC';
import AND from './instructions/AND';
import BCC from './instructions/BCC';
import BCS from './instructions/BCS';
import BEQ from './instructions/BEQ';
import BMI from './instructions/BMI';
import BNE from './instructions/BNE';
import BPL from './instructions/BPL';
import BVC from './instructions/BVC';
import BVS from './instructions/BVS';
import BIT from './instructions/BIT';
import BRK from './instructions/BRK';
import CLC from './instructions/CLC';
import CLD from './instructions/CLD';
import CLI from './instructions/CLI';
import CLV from './instructions/CLV';

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
            throw new Error('Incorrect address mode');
    }
};

const setOperand = (state: State, mode: AddressMode, value: number) => {
    switch (mode) {
        case AddressMode.ACCUMULATOR:
            state.A = value;
            break;
        case AddressMode.ABSOLUTE:
            state.memory[getImmediateWord(state)] = value;
            break;
        case AddressMode.ABSOLUTE_X:
            state.memory[getImmediateWord(state) + state.X] = value;
            break;
        case AddressMode.ABSOLUTE_Y:
            state.memory[getImmediateWord(state) + state.Y] = value;
            break;
        case AddressMode.INDIRECT_X:
            state.memory[getWord(state, getImmediateWord(state) + state.X)] = value;
            break;
        case AddressMode.INDIRECT_Y:
            state.memory[getWord(state, getImmediateWord(state)) + state.Y] = value;
            break;
        case AddressMode.ZEROPAGE:
            state.memory[getImmediateByte(state)] = value;
            break;
        case AddressMode.ZEROPAGE_X:
            state.memory[(getImmediateByte(state) + state.X) & 0xff] = value;
            break;
        case AddressMode.ZEROPAGE_Y:
            state.memory[(getImmediateByte(state) + state.Y) & 0xff] = value;
            break;
        default:
            throw new Error('Incorrect address mode');
    }

    return state;
};

const createInstruction = (
    fn: (state: State, operand: number, setOperand?: (value: number) => State) => State,
    addressMode: AddressMode, bytes: number) => {

    return {
        addressMode: addressMode,
        bytes: bytes,
        fn: (state: State) => {
            const operand = getOperand(state, addressMode);
    
            const result = fn(state, operand, (value: number) => setOperand(state, addressMode, value));
            if (bytes !== 0) result.PC += bytes;
            
            return result;
        }
    } as Instruction;
};

let instructionSet: Instruction[] = [];

// Based on: https://www.masswerk.at/6502/6502_instruction_set.html

// ADC - Add with carry
instructionSet[0x69] = createInstruction(ADC, AddressMode.IMMEDIATE,   2);
instructionSet[0x65] = createInstruction(ADC, AddressMode.ZEROPAGE,    2);
instructionSet[0x75] = createInstruction(ADC, AddressMode.ZEROPAGE_X,  2);
instructionSet[0x6D] = createInstruction(ADC, AddressMode.ABSOLUTE,    3);
instructionSet[0x7D] = createInstruction(ADC, AddressMode.ABSOLUTE_X,  3);
instructionSet[0x79] = createInstruction(ADC, AddressMode.ABSOLUTE_Y,  3);
instructionSet[0x61] = createInstruction(ADC, AddressMode.INDIRECT_X,  2);
instructionSet[0x71] = createInstruction(ADC, AddressMode.INDIRECT_Y,  2);

// AND - And with A
instructionSet[0x29] = createInstruction(AND, AddressMode.IMMEDIATE,   2);
instructionSet[0x25] = createInstruction(AND, AddressMode.ZEROPAGE,    2);
instructionSet[0x35] = createInstruction(AND, AddressMode.ZEROPAGE_X,  2);
instructionSet[0x2D] = createInstruction(AND, AddressMode.ABSOLUTE,    3);
instructionSet[0x3D] = createInstruction(AND, AddressMode.ABSOLUTE_X,  3);
instructionSet[0x39] = createInstruction(AND, AddressMode.ABSOLUTE_Y,  3);
instructionSet[0x21] = createInstruction(AND, AddressMode.INDIRECT_X,  2);
instructionSet[0x31] = createInstruction(AND, AddressMode.INDIRECT_Y,  2);

// ASL - Arithmetic shift left
instructionSet[0x0A] = createInstruction(AND, AddressMode.ACCUMULATOR, 1);
instructionSet[0x06] = createInstruction(AND, AddressMode.ZEROPAGE,    2);
instructionSet[0x16] = createInstruction(AND, AddressMode.ZEROPAGE_X,  2);
instructionSet[0x0E] = createInstruction(AND, AddressMode.ABSOLUTE,    3);
instructionSet[0x1E] = createInstruction(AND, AddressMode.ABSOLUTE_X,  3);

// BCC - Branch on CF = 0
instructionSet[0x90] = createInstruction(BCC, AddressMode.RELATIVE,    2);

// BCS - Branch on CF = 1
instructionSet[0xB0] = createInstruction(BCS, AddressMode.RELATIVE,    2);

// BEQ - Branch on ZF = 1
instructionSet[0xF0] = createInstruction(BEQ, AddressMode.RELATIVE,    2);

// BMI - Branch on NF = 1
instructionSet[0x30] = createInstruction(BMI, AddressMode.RELATIVE,    2);

// BNE - Branch on ZF = 0
instructionSet[0xD0] = createInstruction(BNE, AddressMode.RELATIVE,    2);

// BPL - Branch on NF = 0
instructionSet[0x10] = createInstruction(BPL, AddressMode.RELATIVE,    2);

// BVC - Branch on VF = 0
instructionSet[0x50] = createInstruction(BVC, AddressMode.RELATIVE,    2);

// BVS - Branch on VF = 1
instructionSet[0x70] = createInstruction(BVS, AddressMode.RELATIVE,    2);

// BIT - Test bits in memory with A
instructionSet[0x24] = createInstruction(BIT, AddressMode.ZEROPAGE,    2);
instructionSet[0x2C] = createInstruction(BIT, AddressMode.ABSOLUTE,    3);

// BRK - Force break
instructionSet[0x00] = createInstruction(BRK, AddressMode.IMPLIED,     0);

// CLC - Clear CF
instructionSet[0x18] = createInstruction(CLC, AddressMode.IMPLIED,     1);

// CLD - Clear DF
instructionSet[0xD8] = createInstruction(CLD, AddressMode.IMPLIED,     1);

// CLI - Clear IF
instructionSet[0x58] = createInstruction(CLI, AddressMode.IMPLIED,     1);

// CLV - Clear VF
instructionSet[0xB8] = createInstruction(CLV, AddressMode.IMPLIED,     1);

// Get processor status
export const getSR = (state: State, brk = false) => {
    let value = 0;
    if (state.NF) value = value | 0x80;
    if (state.VF) value = value | 0x40;
    value = value | 0x20; // Always true
    if (brk) value = value | 0x10;
    if (state.DF) value = value | 0x08;
    if (state.IF) value = value | 0x04;
    if (state.ZF) value = value | 0x02;
    if (state.CF) value = value | 0x01;

    return value;
};

// Stack management
export const pushByte = (state: State, value: number) => {
    state.memory[0x0100 | state.SP] = value;
    state.SP--;
};

export const pushWord = (state: State, value: number) => {
    state.memory[0x0100 | state.SP] = value >> 8;
    state.memory[0x0100 | (state.SP - 1)] = value & 0xff;
    state.SP -= 2;
};

export const popByte = (state: State) => {
    state.SP++;
    return state.memory[0x0100 | state.SP];
};

export const popWord = (state: State) => {
    state.SP += 2;
    return (state.memory[0x0100 | state.SP] << 8) | (state.memory[0x0100 | (state.SP - 1)] & 0xFFFF);
};

// IRQ
export const performIRQ = (state: State, offset: number, brk = false) => {
    pushWord(state, state.PC);
    pushByte(state, getSR(state, brk));
    state.IF = true;
    state.PC = getWord(state, offset);
    return state;
};

export default instructionSet;