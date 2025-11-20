# Turing Machine Definition
# Unary Adder - Adds two unary numbers separated by #
# Input format: 111#11 (represents 3 + 2)
# Output: 11111 (represents 5)
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
# Find the separator #
q0, 1 > q0, 1, R
q0, # > q1, 1, R

# Check if second number exists
q1, 1 > q1, 1, R
q1, _ > q2, _, L

# Move back to start
q2, 1 > q2, 1, L
q2, _ > q_accept, _, R

[Accepting States]
q_accept

[Input]
111#11
