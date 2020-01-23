# 6502

[![Build Status](https://travis-ci.com/mat-sz/6502.svg?branch=master)](https://travis-ci.com/mat-sz/6502)

MOS Technology 6502 8-bit CPU emulator written in TypeScript.

Passes common test suites (AllSuiteA and 6502_functional_test).

## Usage

```js
import { MEMORY_SIZE, State, step } from "6502";

// Create 64k of RAM.
const memory = new Uint8Array(MEMORY_SIZE);
let state = new State();

let PC = 0;
state.PC = 0x0400;
memory.set(new Uint8Array(binary), 0x4000);

while (state.PC != PC) {
    // Store old PC for infinite loop detection.
    PC = state.PC;

    // Step isn't a pure function yet, state will be mutated.
    state = step(state,
        (offset) => memory[offset],                // getMemory = (offset) => value
        (offset, value) => memory[offset] = value  // setMemory = (offset, value) => void
    );
}
```