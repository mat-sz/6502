import { Instruction, createInstruction, AddressMode } from './Utils';

import ADC from './instructions/ADC';
import ASL from './instructions/ASL';
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
import CMP from './instructions/CMP';
import CPX from './instructions/CPX';
import CPY from './instructions/CPY';
import DEC from './instructions/DEC';
import DEX from './instructions/DEX';
import DEY from './instructions/DEY';
import INC from './instructions/INC';
import INX from './instructions/INX';
import INY from './instructions/INY';
import EOR from './instructions/EOR';
import ORA from './instructions/ORA';
import JMP from './instructions/JMP';
import JSR from './instructions/JSR';
import RTI from './instructions/RTI';
import RTS from './instructions/RTS';
import PHA from './instructions/PHA';
import PHP from './instructions/PHP';
import PLA from './instructions/PLA';
import PLP from './instructions/PLP';
import LDA from './instructions/LDA';
import LDX from './instructions/LDX';
import LDY from './instructions/LDY';
import STA from './instructions/STA';
import STX from './instructions/STX';
import STY from './instructions/STY';
import NOP from './instructions/NOP';
import TAX from './instructions/TAX';
import TAY from './instructions/TAY';
import TSX from './instructions/TSX';
import TXA from './instructions/TXA';
import TXS from './instructions/TXS';
import TYA from './instructions/TYA';
import LSR from './instructions/LSR';
import SBC from './instructions/SBC';
import ROL from './instructions/ROL';
import ROR from './instructions/ROR';
import SEC from './instructions/SEC';
import SED from './instructions/SED';
import SEI from './instructions/SEI';

let instructionSet: Instruction[] = [];

// Based on: https://www.masswerk.at/6502/6502_instruction_set.html

// ADC - Add with carry
instructionSet[0x69] = createInstruction(ADC, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0x65] = createInstruction(ADC, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x75] = createInstruction(ADC, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0x6D] = createInstruction(ADC, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0x7D] = createInstruction(ADC, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0x79] = createInstruction(ADC, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0x61] = createInstruction(ADC, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0x71] = createInstruction(ADC, AddressMode.INDIRECT_Y,  2, 5);

// AND - And with A
instructionSet[0x29] = createInstruction(AND, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0x25] = createInstruction(AND, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x35] = createInstruction(AND, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0x2D] = createInstruction(AND, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0x3D] = createInstruction(AND, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0x39] = createInstruction(AND, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0x21] = createInstruction(AND, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0x31] = createInstruction(AND, AddressMode.INDIRECT_Y,  2, 5);

// SBC - Subtract with A
instructionSet[0xE9] = createInstruction(SBC, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xE5] = createInstruction(SBC, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xF5] = createInstruction(SBC, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0xED] = createInstruction(SBC, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0xFD] = createInstruction(SBC, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0xF9] = createInstruction(SBC, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0xE1] = createInstruction(SBC, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0xF1] = createInstruction(SBC, AddressMode.INDIRECT_Y,  2, 5);

// ASL - Arithmetic shift left
instructionSet[0x0A] = createInstruction(ASL, AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x06] = createInstruction(ASL, AddressMode.ZEROPAGE,    2, 5);
instructionSet[0x16] = createInstruction(ASL, AddressMode.ZEROPAGE_X,  2, 6);
instructionSet[0x0E] = createInstruction(ASL, AddressMode.ABSOLUTE,    3, 6);
instructionSet[0x1E] = createInstruction(ASL, AddressMode.ABSOLUTE_X,  3, 7);

// LSR - Logical shift right
instructionSet[0x4A] = createInstruction(LSR, AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x46] = createInstruction(LSR, AddressMode.ZEROPAGE,    2, 5);
instructionSet[0x56] = createInstruction(LSR, AddressMode.ZEROPAGE_X,  2, 6);
instructionSet[0x4E] = createInstruction(LSR, AddressMode.ABSOLUTE,    3, 6);
instructionSet[0x5E] = createInstruction(LSR, AddressMode.ABSOLUTE_X,  3, 7);

// ROL - Rotate one bit left
instructionSet[0x2A] = createInstruction(ROL, AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x26] = createInstruction(ROL, AddressMode.ZEROPAGE,    2, 5);
instructionSet[0x36] = createInstruction(ROL, AddressMode.ZEROPAGE_X,  2, 6);
instructionSet[0x2E] = createInstruction(ROL, AddressMode.ABSOLUTE,    3, 6);
instructionSet[0x3E] = createInstruction(ROL, AddressMode.ABSOLUTE_X,  3, 7);

// ROL - Rotate one bit left
instructionSet[0x6A] = createInstruction(ROR, AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x66] = createInstruction(ROR, AddressMode.ZEROPAGE,    2, 5);
instructionSet[0x76] = createInstruction(ROR, AddressMode.ZEROPAGE_X,  2, 6);
instructionSet[0x6E] = createInstruction(ROR, AddressMode.ABSOLUTE,    3, 6);
instructionSet[0x7E] = createInstruction(ROR, AddressMode.ABSOLUTE_X,  3, 7);

// BCC - Branch on CF = 0
instructionSet[0x90] = createInstruction(BCC, AddressMode.RELATIVE,    2, 2);

// BCS - Branch on CF = 1
instructionSet[0xB0] = createInstruction(BCS, AddressMode.RELATIVE,    2, 2);

// BEQ - Branch on ZF = 1
instructionSet[0xF0] = createInstruction(BEQ, AddressMode.RELATIVE,    2, 2);

// BMI - Branch on NF = 1
instructionSet[0x30] = createInstruction(BMI, AddressMode.RELATIVE,    2, 2);

// BNE - Branch on ZF = 0
instructionSet[0xD0] = createInstruction(BNE, AddressMode.RELATIVE,    2, 2);

// BPL - Branch on NF = 0
instructionSet[0x10] = createInstruction(BPL, AddressMode.RELATIVE,    2, 2);

// BVC - Branch on VF = 0
instructionSet[0x50] = createInstruction(BVC, AddressMode.RELATIVE,    2, 2);

// BVS - Branch on VF = 1
instructionSet[0x70] = createInstruction(BVS, AddressMode.RELATIVE,    2, 2);

// BIT - Test bits in memory with A
instructionSet[0x24] = createInstruction(BIT, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x2C] = createInstruction(BIT, AddressMode.ABSOLUTE,    3, 4);

// BRK - Force break
instructionSet[0x00] = createInstruction(BRK, AddressMode.IMPLIED,     0, 7);

// CLC - Clear CF
instructionSet[0x18] = createInstruction(CLC, AddressMode.IMPLIED,     1, 2);

// CLD - Clear DF
instructionSet[0xD8] = createInstruction(CLD, AddressMode.IMPLIED,     1, 2);

// CLI - Clear IF
instructionSet[0x58] = createInstruction(CLI, AddressMode.IMPLIED,     1, 2);

// CLV - Clear VF
instructionSet[0xB8] = createInstruction(CLV, AddressMode.IMPLIED,     1, 2);

// SEC - Clear CF
instructionSet[0x38] = createInstruction(SEC, AddressMode.IMPLIED,     1, 2);

// SED - Clear DF
instructionSet[0xF8] = createInstruction(SED, AddressMode.IMPLIED,     1, 2);

// SEI - Clear IF
instructionSet[0x78] = createInstruction(SEI, AddressMode.IMPLIED,     1, 2);

// CMP - Compare memory with A
instructionSet[0xC9] = createInstruction(CMP, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xC5] = createInstruction(CMP, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xD5] = createInstruction(CMP, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0xCD] = createInstruction(CMP, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0xDD] = createInstruction(CMP, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0xD9] = createInstruction(CMP, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0xC1] = createInstruction(CMP, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0xD1] = createInstruction(CMP, AddressMode.INDIRECT_Y,  2, 5);

// CPX - Compare memory with X
instructionSet[0xE0] = createInstruction(CPX, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xE4] = createInstruction(CPX, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xEC] = createInstruction(CPX, AddressMode.ABSOLUTE,    3, 4);

// CPY - Compare memory with Y
instructionSet[0xC0] = createInstruction(CPY, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xC4] = createInstruction(CPY, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xCC] = createInstruction(CPY, AddressMode.ABSOLUTE,    3, 4);

// DEC - Decrement memory by one
instructionSet[0xC6] = createInstruction(DEC, AddressMode.ZEROPAGE,    2, 5);
instructionSet[0xD6] = createInstruction(DEC, AddressMode.ZEROPAGE_X,  2, 6);
instructionSet[0xCE] = createInstruction(DEC, AddressMode.ABSOLUTE,    3, 6);
instructionSet[0xDE] = createInstruction(DEC, AddressMode.ABSOLUTE_X,  3, 7);

// DEX - Decrement X by one
instructionSet[0xCA] = createInstruction(DEX, AddressMode.IMPLIED,     1, 2);

// DEY - Decrement Y by one
instructionSet[0x88] = createInstruction(DEY, AddressMode.IMPLIED,     1, 2);

// INC - Increment memory by one
instructionSet[0xE6] = createInstruction(INC, AddressMode.ZEROPAGE,    2, 5);
instructionSet[0xF6] = createInstruction(INC, AddressMode.ZEROPAGE_X,  2, 6);
instructionSet[0xEE] = createInstruction(INC, AddressMode.ABSOLUTE,    3, 6);
instructionSet[0xFE] = createInstruction(INC, AddressMode.ABSOLUTE_X,  3, 7);

// INX - Increment X by one
instructionSet[0xE8] = createInstruction(INX, AddressMode.IMPLIED,     1, 2);

// INY - Increment Y by one
instructionSet[0xC8] = createInstruction(INY, AddressMode.IMPLIED,     1, 2);

// EOR - XOR with A
instructionSet[0x49] = createInstruction(EOR, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0x45] = createInstruction(EOR, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x55] = createInstruction(EOR, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0x4D] = createInstruction(EOR, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0x5D] = createInstruction(EOR, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0x59] = createInstruction(EOR, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0x41] = createInstruction(EOR, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0x51] = createInstruction(EOR, AddressMode.INDIRECT_Y,  2, 5);

// ORA - OR with A
instructionSet[0x09] = createInstruction(ORA, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0x05] = createInstruction(ORA, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x15] = createInstruction(ORA, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0x0D] = createInstruction(ORA, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0x1D] = createInstruction(ORA, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0x19] = createInstruction(ORA, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0x01] = createInstruction(ORA, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0x11] = createInstruction(ORA, AddressMode.INDIRECT_Y,  2, 5);

// JMP - Jump
instructionSet[0x4C] = createInstruction(JMP, AddressMode.ABSOLUTE,    0, 3);
instructionSet[0x6C] = createInstruction(JMP, AddressMode.INDIRECT,    0, 5);

// JSR - Jump to subroutine
instructionSet[0x20] = createInstruction(JSR, AddressMode.ABSOLUTE,    0, 6);

// RTI - Return from interrupt
instructionSet[0x40] = createInstruction(RTI, AddressMode.IMPLIED,     1, 6);

// RTS - Return from subroutine
instructionSet[0x60] = createInstruction(RTS, AddressMode.IMPLIED,     1, 6);

// PHA - Push A on stack
instructionSet[0x48] = createInstruction(PHA, AddressMode.IMPLIED,     1, 3);

// PHP - Push SR on stack
instructionSet[0x08] = createInstruction(PHP, AddressMode.IMPLIED,     1, 3);

// PLA - Pull A from stack
instructionSet[0x68] = createInstruction(PLA, AddressMode.IMPLIED,     1, 4);

// PLP - Pull SR from stack
instructionSet[0x28] = createInstruction(PLP, AddressMode.IMPLIED,     1, 4);

// LDA - Load A from memory
instructionSet[0xA9] = createInstruction(LDA, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xA5] = createInstruction(LDA, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xB5] = createInstruction(LDA, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0xAD] = createInstruction(LDA, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0xBD] = createInstruction(LDA, AddressMode.ABSOLUTE_X,  3, 4);
instructionSet[0xB9] = createInstruction(LDA, AddressMode.ABSOLUTE_Y,  3, 4);
instructionSet[0xA1] = createInstruction(LDA, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0xB1] = createInstruction(LDA, AddressMode.INDIRECT_Y,  2, 5);

// LDX - Load X from memory
instructionSet[0xA2] = createInstruction(LDX, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xA6] = createInstruction(LDX, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xB6] = createInstruction(LDX, AddressMode.ZEROPAGE_Y,  2, 4);
instructionSet[0xAE] = createInstruction(LDX, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0xBE] = createInstruction(LDX, AddressMode.ABSOLUTE_Y,  3, 4);

// LDY - Load Y from memory
instructionSet[0xA0] = createInstruction(LDY, AddressMode.IMMEDIATE,   2, 2);
instructionSet[0xA4] = createInstruction(LDY, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0xB4] = createInstruction(LDY, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0xAC] = createInstruction(LDY, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0xBC] = createInstruction(LDY, AddressMode.ABSOLUTE_X,  3, 4);

// STA - Store A in memory
instructionSet[0x85] = createInstruction(STA, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x95] = createInstruction(STA, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0x8D] = createInstruction(STA, AddressMode.ABSOLUTE,    3, 4);
instructionSet[0x9D] = createInstruction(STA, AddressMode.ABSOLUTE_X,  3, 5);
instructionSet[0x99] = createInstruction(STA, AddressMode.ABSOLUTE_Y,  3, 5);
instructionSet[0x81] = createInstruction(STA, AddressMode.INDIRECT_X,  2, 6);
instructionSet[0x91] = createInstruction(STA, AddressMode.INDIRECT_Y,  2, 6);

// STX - Store X in memory
instructionSet[0x86] = createInstruction(STX, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x96] = createInstruction(STX, AddressMode.ZEROPAGE_Y,  2, 4);
instructionSet[0x8E] = createInstruction(STX, AddressMode.ABSOLUTE,    3, 4);

// STY - Store Y in memory
instructionSet[0x84] = createInstruction(STY, AddressMode.ZEROPAGE,    2, 3);
instructionSet[0x94] = createInstruction(STY, AddressMode.ZEROPAGE_X,  2, 4);
instructionSet[0x8C] = createInstruction(STY, AddressMode.ABSOLUTE,    3, 4);

// NOP - No operation
instructionSet[0xEA] = createInstruction(NOP, AddressMode.IMPLIED,     1, 2);

// TAX - Transfer A to X
instructionSet[0xAA] = createInstruction(TAX, AddressMode.IMPLIED,     1, 2);

// TAY - Transfer A to Y
instructionSet[0xA8] = createInstruction(TAY, AddressMode.IMPLIED,     1, 2);

// TSX - Transfer SP to X
instructionSet[0xBA] = createInstruction(TSX, AddressMode.IMPLIED,     1, 2);

// TXA - Transfer X to A
instructionSet[0x8A] = createInstruction(TXA, AddressMode.IMPLIED,     1, 2);

// TXS - Transfer X to SP
instructionSet[0x9A] = createInstruction(TXS, AddressMode.IMPLIED,     1, 2);

// TYA - Transfer Y to A
instructionSet[0x98] = createInstruction(TYA, AddressMode.IMPLIED,     1, 2);

export default instructionSet;