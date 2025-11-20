# Quick Start Guide - Turing Machine Simulator

## Your First Turing Machine in 5 Minutes

### Step 1: Load an Example

The easiest way to start is to load one of the example files:

1. Click "📂 Load from File"
2. Select `examples/replace-zeros.tm`
3. The machine will automatically load with:
   - Input: `10010`
   - Transitions to replace all 0s with 1s
   - Accepting state: `q_accept`

### Step 2: Run the Machine

Try the different execution modes:

**Single Step Mode:**
1. Click "⏭ Step Forward" to execute one transition
2. Watch the tape and state change
3. Click "⏮ Step Back" to undo a step

**Automatic Mode:**
1. Click "▶ Run" to execute automatically
2. The machine will run at ~2 steps per second
3. Click "⏸ Pause" to stop at any time

### Step 3: Understand the Display

**Tape Display:**
- White cells: Tape contents
- Yellow highlighted cell: Current head position
- Arrow above: Shows current state and position
- `_` symbol: Blank (empty) cell

**Status Messages:**
- 🟢 Green: Accepted (halted in accepting state)
- 🔴 Red: Rejected (halted, not in accepting state)
- 🔵 Blue: Information messages
- 🟡 Yellow: Running

### Step 4: Create Your Own Machine

Let's create a simple machine that accepts strings ending in "1":

1. **Clear everything and reset**

2. **Enter input:**
   ```
   1101
   ```

3. **Enter transitions:**
   ```
   q0, 0 > q0, 0, R
   q0, 1 > q0, 1, R
   q0, _ > q1, _, L
   q1, 1 > q_accept, 1, N
   ```

4. **Enter accepting states:**
   ```
   q_accept
   ```

5. **Click "Reset"** then **"Run"**

### Step 5: Save Your Work

1. Click "💾 Save to File"
2. The file will download as `turing-machine.tm`
3. You can load it later with "📂 Load from File"

## Common Patterns

### Pattern 1: Move to End of Tape
```
q0, 0 > q0, 0, R
q0, 1 > q0, 1, R
q0, _ > q1, _, L
```
Moves right until finding blank, then steps back.

### Pattern 2: Mark and Find
```
q0, 0 > q1, X, R    # Mark current symbol
q1, 0 > q1, 0, R    # Search for something
q1, 1 > q2, Y, L    # Mark found symbol
q2, 0 > q2, 0, L    # Return to start
q2, X > q0, X, R    # Continue from mark
```

### Pattern 3: Accept/Reject
```
q_final, _ > q_accept, _, N    # Accept
q_error, _ > q_reject, _, N    # Reject
```

## Debugging Tips

### Machine doesn't halt?
- Missing transition for some state/symbol combination
- Check for typos in state names
- Verify all paths lead to accepting or implicit rejection

### Wrong result?
- Use "Step Forward" to trace execution
- Check each transition carefully
- Verify Direction is correct (L/R/N)

### Can't load file?
- Make sure file has `.tm` extension
- Check file format matches examples
- Try loading an example file first

## Example Challenges

Try creating machines for these problems:

1. **Easy**: Accept only strings of three 1s
2. **Medium**: Accept binary numbers divisible by 2
3. **Hard**: Multiply two unary numbers

## Need Help?

- Check the `examples/` folder for more complex machines
- Read the full README.md for detailed documentation
- Study the transition format carefully
- Start simple and build complexity gradually

Happy Turing Machine building! 🎓
