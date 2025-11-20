# Turing Machine Definition
# Simple Example - Replaces all 0s with 1s
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
q0, 0 > q0, 1, R
q0, 1 > q0, 1, R
q0, _ > q_accept, _, N

[Accepting States]
q_accept

[Input]
10010
