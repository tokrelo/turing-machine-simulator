# Turing Machine Definition
# Binary Counter - Increments a binary number by 1
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
# Move to the rightmost digit
q0, 0 > q0, 0, R
q0, 1 > q0, 1, R
q0, _ > q1, _, L

# Add 1 (handle carry)
q1, 0 > q_accept, 1, N
q1, 1 > q1, 0, L
q1, _ > q_accept, 1, N

[Accepting States]
q_accept

[Input]
1101
