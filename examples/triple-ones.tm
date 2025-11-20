# Turing Machine Definition
# Triple Ones Detector - Accepts strings containing "111"
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
# Initial state - looking for first 1
q0, 0 > q0, 0, R
q0, 1 > q1, 1, R
q0, _ > q_reject, _, N

# Found one 1 - looking for second
q1, 0 > q0, 0, R
q1, 1 > q2, 1, R
q1, _ > q_reject, _, N

# Found two 1s - looking for third
q2, 0 > q0, 0, R
q2, 1 > q_accept, 1, R
q2, _ > q_reject, _, N

# Found three 1s - accept and continue
q_accept, 0 > q_accept, 0, R
q_accept, 1 > q_accept, 1, R
q_accept, _ > q_accept, _, N

[Accepting States]
q_accept

[Input]
0110111
