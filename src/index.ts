import instructionSet from './instructionSet';
import { performIRQ } from './Utils';
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

    memory = new Uint8Array(MEMORY_SIZE); // Memory (at most 64KiB)

    NMI = false;
    IRQ = false;

    cycles= 0;  // Count of cycles spent on an instruction,
                // is reset on step().
};

export class CPU {
    private state: State = new State();

    constructor() {

    }

    /**
     * Loads data into memory at a given offset
     * @param offset 
     * @param data 
     * @param updatePC Should the program counter be updated to the given offset. (true by default)
     */
    load(offset: number, data: Uint8Array, updatePC = true) {
        if (offset + data.length > MEMORY_SIZE) {
            throw new Error('Memory out of bounds.');
        }

        this.state.memory.set(data, offset);

        if (updatePC) {
            this.state.PC = offset;
        }
    }

    /**
     * Executes next instruction.
     */
    step() {
        this.state.cycles = 0;

        const code = this.state.memory[this.state.PC];
        if (code in instructionSet) {
            this.state = instructionSet[code].fn(this.state);
        } else {
            throw new Error('Unsupported opcode. ' + code.toString(16) + ' at ' + this.state.PC.toString(16));
        }

        // Handle NMI and IRQ
        if (this.state.NMI) {
            performIRQ(this.state, 0xFFFA);
            this.state.NMI = false;
        } else if (!this.state.IF && this.state.IRQ) {
            performIRQ(this.state, 0xFFFE);
            this.state.NMI = false;
        }
    }

    /**
     * Starts execution from a given address.
     * @param address 
     */
    execute(address: number) {
        let oldPC = 0;
        this.state.PC = address;

        while (this.state.PC != oldPC) {
            oldPC = this.state.PC;
            this.step();
        }

        return this.state;
    }
};