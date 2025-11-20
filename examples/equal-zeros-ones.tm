# Turing Machine Definition
# Simple Acceptor - Accepts strings with equal 0s and 1s
# Uses a simple marking strategy
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
# Start: find a 0 or 1 to match
q0, 0 > q_find1, X, R
q0, 1 > q_find0, Y, R
q0, X > q0, X, R
q0, Y > q0, Y, R
q0, _ > q_check, _, L

# After marking 0, find matching 1
q_find1, 0 > q_find1, 0, R
q_find1, 1 > q_return, Y, L
q_find1, X > q_find1, X, R
q_find1, Y > q_find1, Y, R

# After marking 1, find matching 0
q_find0, 0 > q_return, X, L
q_find0, 1 > q_find0, 1, R
q_find0, X > q_find0, X, R
q_find0, Y > q_find0, Y, R

# Return to start
q_return, 0 > q_return, 0, L
q_return, 1 > q_return, 1, L
q_return, X > q_return, X, L
q_return, Y > q_return, Y, L
q_return, _ > q0, _, R

# Check if all matched
q_check, X > q_check, X, L
q_check, Y > q_check, Y, L
q_check, _ > q_accept, _, R

[Accepting States]
q_accept

[Input]
0011
