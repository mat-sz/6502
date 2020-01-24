"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = require("./Utils");
var ADC_1 = require("./instructions/ADC");
var ASL_1 = require("./instructions/ASL");
var AND_1 = require("./instructions/AND");
var BCC_1 = require("./instructions/BCC");
var BCS_1 = require("./instructions/BCS");
var BEQ_1 = require("./instructions/BEQ");
var BMI_1 = require("./instructions/BMI");
var BNE_1 = require("./instructions/BNE");
var BPL_1 = require("./instructions/BPL");
var BVC_1 = require("./instructions/BVC");
var BVS_1 = require("./instructions/BVS");
var BIT_1 = require("./instructions/BIT");
var BRK_1 = require("./instructions/BRK");
var CLC_1 = require("./instructions/CLC");
var CLD_1 = require("./instructions/CLD");
var CLI_1 = require("./instructions/CLI");
var CLV_1 = require("./instructions/CLV");
var CMP_1 = require("./instructions/CMP");
var CPX_1 = require("./instructions/CPX");
var CPY_1 = require("./instructions/CPY");
var DEC_1 = require("./instructions/DEC");
var DEX_1 = require("./instructions/DEX");
var DEY_1 = require("./instructions/DEY");
var INC_1 = require("./instructions/INC");
var INX_1 = require("./instructions/INX");
var INY_1 = require("./instructions/INY");
var EOR_1 = require("./instructions/EOR");
var ORA_1 = require("./instructions/ORA");
var JMP_1 = require("./instructions/JMP");
var JSR_1 = require("./instructions/JSR");
var RTI_1 = require("./instructions/RTI");
var RTS_1 = require("./instructions/RTS");
var PHA_1 = require("./instructions/PHA");
var PHP_1 = require("./instructions/PHP");
var PLA_1 = require("./instructions/PLA");
var PLP_1 = require("./instructions/PLP");
var LDA_1 = require("./instructions/LDA");
var LDX_1 = require("./instructions/LDX");
var LDY_1 = require("./instructions/LDY");
var STA_1 = require("./instructions/STA");
var STX_1 = require("./instructions/STX");
var STY_1 = require("./instructions/STY");
var NOP_1 = require("./instructions/NOP");
var TAX_1 = require("./instructions/TAX");
var TAY_1 = require("./instructions/TAY");
var TSX_1 = require("./instructions/TSX");
var TXA_1 = require("./instructions/TXA");
var TXS_1 = require("./instructions/TXS");
var TYA_1 = require("./instructions/TYA");
var LSR_1 = require("./instructions/LSR");
var SBC_1 = require("./instructions/SBC");
var ROL_1 = require("./instructions/ROL");
var ROR_1 = require("./instructions/ROR");
var SEC_1 = require("./instructions/SEC");
var SED_1 = require("./instructions/SED");
var SEI_1 = require("./instructions/SEI");
var instructionSet = [];
// Based on: https://www.masswerk.at/6502/6502_instruction_set.html
// ADC - Add with carry
instructionSet[0x69] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0x65] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x75] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0x6D] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0x7D] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0x79] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0x61] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0x71] = Utils_1.createInstruction(ADC_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// AND - And with A
instructionSet[0x29] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0x25] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x35] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0x2D] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0x3D] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0x39] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0x21] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0x31] = Utils_1.createInstruction(AND_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// SBC - Subtract with A
instructionSet[0xE9] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xE5] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xF5] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0xED] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0xFD] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0xF9] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0xE1] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0xF1] = Utils_1.createInstruction(SBC_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// ASL - Arithmetic shift left
instructionSet[0x0A] = Utils_1.createInstruction(ASL_1.default, Utils_1.AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x06] = Utils_1.createInstruction(ASL_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 5);
instructionSet[0x16] = Utils_1.createInstruction(ASL_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 6);
instructionSet[0x0E] = Utils_1.createInstruction(ASL_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 6);
instructionSet[0x1E] = Utils_1.createInstruction(ASL_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 7);
// LSR - Logical shift right
instructionSet[0x4A] = Utils_1.createInstruction(LSR_1.default, Utils_1.AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x46] = Utils_1.createInstruction(LSR_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 5);
instructionSet[0x56] = Utils_1.createInstruction(LSR_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 6);
instructionSet[0x4E] = Utils_1.createInstruction(LSR_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 6);
instructionSet[0x5E] = Utils_1.createInstruction(LSR_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 7);
// ROL - Rotate one bit left
instructionSet[0x2A] = Utils_1.createInstruction(ROL_1.default, Utils_1.AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x26] = Utils_1.createInstruction(ROL_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 5);
instructionSet[0x36] = Utils_1.createInstruction(ROL_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 6);
instructionSet[0x2E] = Utils_1.createInstruction(ROL_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 6);
instructionSet[0x3E] = Utils_1.createInstruction(ROL_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 7);
// ROL - Rotate one bit left
instructionSet[0x6A] = Utils_1.createInstruction(ROR_1.default, Utils_1.AddressMode.ACCUMULATOR, 1, 2);
instructionSet[0x66] = Utils_1.createInstruction(ROR_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 5);
instructionSet[0x76] = Utils_1.createInstruction(ROR_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 6);
instructionSet[0x6E] = Utils_1.createInstruction(ROR_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 6);
instructionSet[0x7E] = Utils_1.createInstruction(ROR_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 7);
// BCC - Branch on CF = 0
instructionSet[0x90] = Utils_1.createInstruction(BCC_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BCS - Branch on CF = 1
instructionSet[0xB0] = Utils_1.createInstruction(BCS_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BEQ - Branch on ZF = 1
instructionSet[0xF0] = Utils_1.createInstruction(BEQ_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BMI - Branch on NF = 1
instructionSet[0x30] = Utils_1.createInstruction(BMI_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BNE - Branch on ZF = 0
instructionSet[0xD0] = Utils_1.createInstruction(BNE_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BPL - Branch on NF = 0
instructionSet[0x10] = Utils_1.createInstruction(BPL_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BVC - Branch on VF = 0
instructionSet[0x50] = Utils_1.createInstruction(BVC_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BVS - Branch on VF = 1
instructionSet[0x70] = Utils_1.createInstruction(BVS_1.default, Utils_1.AddressMode.RELATIVE, 2, 2);
// BIT - Test bits in memory with A
instructionSet[0x24] = Utils_1.createInstruction(BIT_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x2C] = Utils_1.createInstruction(BIT_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
// BRK - Force break
instructionSet[0x00] = Utils_1.createInstruction(BRK_1.default, Utils_1.AddressMode.IMPLIED, 0, 7);
// CLC - Clear CF
instructionSet[0x18] = Utils_1.createInstruction(CLC_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// CLD - Clear DF
instructionSet[0xD8] = Utils_1.createInstruction(CLD_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// CLI - Clear IF
instructionSet[0x58] = Utils_1.createInstruction(CLI_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// CLV - Clear VF
instructionSet[0xB8] = Utils_1.createInstruction(CLV_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// SEC - Clear CF
instructionSet[0x38] = Utils_1.createInstruction(SEC_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// SED - Clear DF
instructionSet[0xF8] = Utils_1.createInstruction(SED_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// SEI - Clear IF
instructionSet[0x78] = Utils_1.createInstruction(SEI_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// CMP - Compare memory with A
instructionSet[0xC9] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xC5] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xD5] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0xCD] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0xDD] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0xD9] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0xC1] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0xD1] = Utils_1.createInstruction(CMP_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// CPX - Compare memory with X
instructionSet[0xE0] = Utils_1.createInstruction(CPX_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xE4] = Utils_1.createInstruction(CPX_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xEC] = Utils_1.createInstruction(CPX_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
// CPY - Compare memory with Y
instructionSet[0xC0] = Utils_1.createInstruction(CPY_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xC4] = Utils_1.createInstruction(CPY_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xCC] = Utils_1.createInstruction(CPY_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
// DEC - Decrement memory by one
instructionSet[0xC6] = Utils_1.createInstruction(DEC_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 5);
instructionSet[0xD6] = Utils_1.createInstruction(DEC_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 6);
instructionSet[0xCE] = Utils_1.createInstruction(DEC_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 6);
instructionSet[0xDE] = Utils_1.createInstruction(DEC_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 7);
// DEX - Decrement X by one
instructionSet[0xCA] = Utils_1.createInstruction(DEX_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// DEY - Decrement Y by one
instructionSet[0x88] = Utils_1.createInstruction(DEY_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// INC - Increment memory by one
instructionSet[0xE6] = Utils_1.createInstruction(INC_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 5);
instructionSet[0xF6] = Utils_1.createInstruction(INC_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 6);
instructionSet[0xEE] = Utils_1.createInstruction(INC_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 6);
instructionSet[0xFE] = Utils_1.createInstruction(INC_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 7);
// INX - Increment X by one
instructionSet[0xE8] = Utils_1.createInstruction(INX_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// INY - Increment Y by one
instructionSet[0xC8] = Utils_1.createInstruction(INY_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// EOR - XOR with A
instructionSet[0x49] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0x45] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x55] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0x4D] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0x5D] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0x59] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0x41] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0x51] = Utils_1.createInstruction(EOR_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// ORA - OR with A
instructionSet[0x09] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0x05] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x15] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0x0D] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0x1D] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0x19] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0x01] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0x11] = Utils_1.createInstruction(ORA_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// JMP - Jump
instructionSet[0x4C] = Utils_1.createInstruction(JMP_1.default, Utils_1.AddressMode.ABSOLUTE, 0, 3);
instructionSet[0x6C] = Utils_1.createInstruction(JMP_1.default, Utils_1.AddressMode.INDIRECT, 0, 5);
// JSR - Jump to subroutine
instructionSet[0x20] = Utils_1.createInstruction(JSR_1.default, Utils_1.AddressMode.ABSOLUTE, 0, 6);
// RTI - Return from interrupt
instructionSet[0x40] = Utils_1.createInstruction(RTI_1.default, Utils_1.AddressMode.IMPLIED, 1, 6);
// RTS - Return from subroutine
instructionSet[0x60] = Utils_1.createInstruction(RTS_1.default, Utils_1.AddressMode.IMPLIED, 1, 6);
// PHA - Push A on stack
instructionSet[0x48] = Utils_1.createInstruction(PHA_1.default, Utils_1.AddressMode.IMPLIED, 1, 3);
// PHP - Push SR on stack
instructionSet[0x08] = Utils_1.createInstruction(PHP_1.default, Utils_1.AddressMode.IMPLIED, 1, 3);
// PLA - Pull A from stack
instructionSet[0x68] = Utils_1.createInstruction(PLA_1.default, Utils_1.AddressMode.IMPLIED, 1, 4);
// PLP - Pull SR from stack
instructionSet[0x28] = Utils_1.createInstruction(PLP_1.default, Utils_1.AddressMode.IMPLIED, 1, 4);
// LDA - Load A from memory
instructionSet[0xA9] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xA5] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xB5] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0xAD] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0xBD] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
instructionSet[0xB9] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
instructionSet[0xA1] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0xB1] = Utils_1.createInstruction(LDA_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 5);
// LDX - Load X from memory
instructionSet[0xA2] = Utils_1.createInstruction(LDX_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xA6] = Utils_1.createInstruction(LDX_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xB6] = Utils_1.createInstruction(LDX_1.default, Utils_1.AddressMode.ZEROPAGE_Y, 2, 4);
instructionSet[0xAE] = Utils_1.createInstruction(LDX_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0xBE] = Utils_1.createInstruction(LDX_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 4);
// LDY - Load Y from memory
instructionSet[0xA0] = Utils_1.createInstruction(LDY_1.default, Utils_1.AddressMode.IMMEDIATE, 2, 2);
instructionSet[0xA4] = Utils_1.createInstruction(LDY_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0xB4] = Utils_1.createInstruction(LDY_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0xAC] = Utils_1.createInstruction(LDY_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0xBC] = Utils_1.createInstruction(LDY_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 4);
// STA - Store A in memory
instructionSet[0x85] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x95] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0x8D] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
instructionSet[0x9D] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.ABSOLUTE_X, 3, 5);
instructionSet[0x99] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.ABSOLUTE_Y, 3, 5);
instructionSet[0x81] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.INDIRECT_X, 2, 6);
instructionSet[0x91] = Utils_1.createInstruction(STA_1.default, Utils_1.AddressMode.INDIRECT_Y, 2, 6);
// STX - Store X in memory
instructionSet[0x86] = Utils_1.createInstruction(STX_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x96] = Utils_1.createInstruction(STX_1.default, Utils_1.AddressMode.ZEROPAGE_Y, 2, 4);
instructionSet[0x8E] = Utils_1.createInstruction(STX_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
// STY - Store Y in memory
instructionSet[0x84] = Utils_1.createInstruction(STY_1.default, Utils_1.AddressMode.ZEROPAGE, 2, 3);
instructionSet[0x94] = Utils_1.createInstruction(STY_1.default, Utils_1.AddressMode.ZEROPAGE_X, 2, 4);
instructionSet[0x8C] = Utils_1.createInstruction(STY_1.default, Utils_1.AddressMode.ABSOLUTE, 3, 4);
// NOP - No operation
instructionSet[0xEA] = Utils_1.createInstruction(NOP_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// TAX - Transfer A to X
instructionSet[0xAA] = Utils_1.createInstruction(TAX_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// TAY - Transfer A to Y
instructionSet[0xA8] = Utils_1.createInstruction(TAY_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// TSX - Transfer SP to X
instructionSet[0xBA] = Utils_1.createInstruction(TSX_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// TXA - Transfer X to A
instructionSet[0x8A] = Utils_1.createInstruction(TXA_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// TXS - Transfer X to SP
instructionSet[0x9A] = Utils_1.createInstruction(TXS_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
// TYA - Transfer Y to A
instructionSet[0x98] = Utils_1.createInstruction(TYA_1.default, Utils_1.AddressMode.IMPLIED, 1, 2);
exports.default = instructionSet;
