# Turing Machine Definition
# Palindrome Checker - Checks if a binary string is a palindrome
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
# Start: check first symbol
q0, 0 > q_check0, _, R
q0, 1 > q_check1, _, R
q0, _ > q_accept, _, N

# After reading 0, find matching 0 at end
q_check0, 0 > q_check0, 0, R
q_check0, 1 > q_check0, 1, R
q_check0, _ > q_back0, _, L

q_back0, 0 > q_return, _, L
q_back0, _ > q_accept, _, N

# After reading 1, find matching 1 at end
q_check1, 0 > q_check1, 0, R
q_check1, 1 > q_check1, 1, R
q_check1, _ > q_back1, _, L

q_back1, 1 > q_return, _, L
q_back1, _ > q_accept, _, N

# Return to start
q_return, 0 > q_return, 0, L
q_return, 1 > q_return, 1, L
q_return, _ > q0, _, R

[Accepting States]
q_accept

[Input]
10101
