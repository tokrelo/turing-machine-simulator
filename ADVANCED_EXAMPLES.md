# Advanced Turing Machine Examples

This guide provides detailed explanations of more complex Turing Machine examples.

## Binary Counter

**File:** `binary-counter.tm`  
**Purpose:** Increment a binary number by 1

### Algorithm:
1. Move to the rightmost digit
2. If it's 0, change to 1 and halt (no carry)
3. If it's 1, change to 0 and move left (carry the 1)
4. Repeat step 2-3 until finding a 0 or reaching the beginning
5. If we reach the beginning, write a 1 (overflow)

### State Transitions Explained:
```
q0, 0 > q0, 0, R    # Skip 0s while moving right
q0, 1 > q0, 1, R    # Skip 1s while moving right
q0, _ > q1, _, L    # Found end, move back to last digit

q1, 0 > q_accept, 1, N    # Found 0, change to 1, done!
q1, 1 > q1, 0, L          # Found 1, change to 0, carry left
q1, _ > q_accept, 1, N    # Overflow, add 1 at beginning
```

### Test Cases:
- Input: `0` → Output: `1`
- Input: `1` → Output: `10`
- Input: `101` → Output: `110`
- Input: `111` → Output: `1000`

---

## Palindrome Checker

**File:** `palindrome-checker.tm`  
**Purpose:** Determine if a binary string is a palindrome

### Algorithm:
1. Mark the leftmost symbol with X (for 0) or Y (for 1)
2. Move to the rightmost unmarked symbol
3. Check if it matches the marked symbol
4. If yes, mark it and return to step 1
5. If all symbols matched, accept
6. If mismatch or odd remaining symbols, reject

### State Transitions Explained:
```
q0, 0 > q_check0, _, R    # Mark first 0, look for matching
q0, 1 > q_check1, _, R    # Mark first 1, look for matching
q0, _ > q_accept, _, N    # Empty string is palindrome

# After marking 0, find rightmost symbol
q_check0, 0 > q_check0, 0, R    # Skip to end
q_check0, 1 > q_check0, 1, R    # Skip to end
q_check0, _ > q_back0, _, L     # Found end

q_back0, 0 > q_return, _, L     # Match! Mark and return
q_back0, _ > q_accept, _, N     # Single symbol (odd length)
```

### Test Cases:
- Input: `010` → REJECT
- Input: `101` → ACCEPT
- Input: `1001` → ACCEPT
- Input: `110011` → ACCEPT

---

## Unary Adder

**File:** `unary-adder.tm`  
**Purpose:** Add two unary numbers

### Algorithm:
Unary representation: n is represented by n ones
- 3 = `111`
- 2 = `11`
- Input format: `111#11` (means 3 + 2)

1. Replace the separator `#` with `1`
2. Remove one `1` from the right side (if exists)
3. Result: `11111` (represents 5)

### State Transitions Explained:
```
q0, 1 > q0, 1, R     # Move past first number
q0, # > q1, 1, R     # Replace # with 1 (this adds the separator)

q1, 1 > q1, 1, R     # Move to end of second number
q1, _ > q2, _, L     # Found end

q2, 1 > q2, 1, L     # Move back to start
q2, _ > q_accept, _, R    # Done
```

### Test Cases:
- Input: `1#1` → Output: `11` (1+1=2)
- Input: `111#11` → Output: `11111` (3+2=5)
- Input: `1111#1111` → Output: `11111111` (4+4=8)

---

## Binary Duplicator

**File:** `binary-duplicator.tm`  
**Purpose:** Copy a binary string, separated by #

### Algorithm:
1. Mark the first symbol as X (for 0) or Y (for 1)
2. Move to the end and write the corresponding symbol
3. Return to the marked position
4. Repeat until all symbols are copied
5. Restore X→0 and Y→1

### State Transitions Explained:
```
q0, 0 > q_copy0, X, R    # Mark 0, prepare to copy
q0, 1 > q_copy1, Y, R    # Mark 1, prepare to copy
q0, _ > q_done, #, L     # Finished copying

# Copy the 0
q_copy0, ... > q_copy0, ..., R    # Move to end
q_copy0, _ > q_back0, 0, L        # Write 0 at end

# Return to continue
q_back0, ... > q_back0, ..., L    # Move back
q_back0, _ > q0, _, R             # Next symbol

# Restore original
q_done, X > q_done, 0, L    # Restore 0s
q_done, Y > q_done, 1, L    # Restore 1s
```

### Test Cases:
- Input: `0` → Output: `0#0`
- Input: `101` → Output: `101#101`
- Input: `1010` → Output: `1010#1010`

---

## Equal Zeros and Ones

**File:** `equal-zeros-ones.tm`  
**Purpose:** Accept strings with equal number of 0s and 1s

### Algorithm:
1. Find an unmarked 0, mark it with X
2. Find an unmarked 1, mark it with Y
3. Return to the beginning
4. Repeat until no unmarked symbols
5. Accept if all paired, reject otherwise

### State Transitions Explained:
```
q0, 0 > q_find1, X, R    # Mark a 0, look for 1
q0, 1 > q_find0, Y, R    # Mark a 1, look for 0
q0, _ > q_check, _, L    # No more unmarked, check

# After marking 0
q_find1, 0 > q_find1, 0, R    # Skip 0s
q_find1, 1 > q_return, Y, L   # Found 1, mark it

# Check at end
q_check, X > q_check, X, L    # All marked
q_check, Y > q_check, Y, L    # All marked
q_check, _ > q_accept, _, R   # Success!
```

### Test Cases:
- Input: `01` → ACCEPT
- Input: `0011` → ACCEPT
- Input: `010101` → ACCEPT
- Input: `001` → REJECT
- Input: `0111` → REJECT

---

## Triple Ones Detector

**File:** `triple-ones.tm`  
**Purpose:** Accept if string contains "111"

### Algorithm:
1. Scan left to right
2. Track consecutive 1s with states q0, q1, q2
3. If we see three 1s in a row, accept
4. Any 0 resets the counter

### State Transitions Explained:
```
q0, 0 > q0, 0, R    # Reset counter on 0
q0, 1 > q1, 1, R    # First 1

q1, 0 > q0, 0, R    # Reset on 0
q1, 1 > q2, 1, R    # Second 1

q2, 0 > q0, 0, R    # Reset on 0
q2, 1 > q_accept, 1, R    # Third 1 - ACCEPT!

q_accept, ... > q_accept, ..., R    # Stay in accept
```

### Test Cases:
- Input: `111` → ACCEPT
- Input: `0111` → ACCEPT
- Input: `110110` → REJECT
- Input: `1101110` → ACCEPT

---

## Tips for Creating Your Own

### 1. Start Simple
- Begin with single-state machines
- Add complexity gradually
- Test each addition

### 2. Use Meaningful State Names
- `q_find_zero` is better than `q3`
- `q_accept` and `q_reject` are clear
- Document your states

### 3. Handle All Cases
- What if input is empty?
- What if tape has only one symbol?
- What about all 0s or all 1s?

### 4. Debug Systematically
- Use Step Forward to trace execution
- Check each transition individually
- Verify all state names match

### 5. Test Edge Cases
- Empty input: `_`
- Single symbol: `0` or `1`
- Maximum test case you can think of
- Minimum test case

### 6. Document Your Machine
- Add comments with `#`
- Explain the algorithm
- List test cases
- Note any limitations

---

## Resources for Learning More

1. **Theory of Computation** textbooks
2. **Online TM simulators** for comparison
3. **Classic TM problems**:
   - Busy Beaver
   - Universal Turing Machine
   - Halting Problem examples

Happy Turing Machine designing! 🎓
