# Turing Machine Definition
# Binary Duplicator - Duplicates a binary string
# Input: 101
# Output: 101#101
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
# Mark first 0 and copy it
q0, 0 > q_copy0, X, R
q0, 1 > q_copy1, Y, R
q0, _ > q_done, #, L

# Copy 0: find end and write 0
q_copy0, 0 > q_copy0, 0, R
q_copy0, 1 > q_copy0, 1, R
q_copy0, Y > q_copy0, Y, R
q_copy0, X > q_copy0, X, R
q_copy0, # > q_copy0, #, R
q_copy0, _ > q_back0, 0, L

# Copy 1: find end and write 1
q_copy1, 0 > q_copy1, 0, R
q_copy1, 1 > q_copy1, 1, R
q_copy1, Y > q_copy1, Y, R
q_copy1, X > q_copy1, X, R
q_copy1, # > q_copy1, #, R
q_copy1, _ > q_back1, 1, L

# Go back after copying 0
q_back0, 0 > q_back0, 0, L
q_back0, 1 > q_back0, 1, L
q_back0, X > q_back0, X, L
q_back0, Y > q_back0, Y, L
q_back0, # > q_back0, #, L
q_back0, _ > q0, _, R

# Go back after copying 1
q_back1, 0 > q_back1, 0, L
q_back1, 1 > q_back1, 1, L
q_back1, X > q_back1, X, L
q_back1, Y > q_back1, Y, L
q_back1, # > q_back1, #, L
q_back1, _ > q0, _, R

# Restore original symbols
q_done, X > q_done, 0, L
q_done, Y > q_done, 1, L
q_done, 0 > q_done, 0, L
q_done, 1 > q_done, 1, L
q_done, _ > q_accept, _, R

[Accepting States]
q_accept

[Input]
101
