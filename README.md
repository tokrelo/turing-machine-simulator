# H5P Turing Machine Simulator

An interactive Turing Machine simulator for Moodle using H5P framework. This educational tool allows students to create, test, and visualize Turing Machine computations.

## Features

- **Visual Tape Display**: Real-time visualization of the tape with current head position and state
- **Interactive Controls**:
  - Step Back: Undo the last transition
  - Run: Execute the machine automatically
  - Pause: Stop automatic execution
  - Step Forward: Execute one transition
  - Reset: Return to initial state
- **Editable Components**:
  - Input tape configuration
  - State transition function definition
  - Accepting states specification
- **File Management**: Save and load Turing Machine definitions (.tm files)
- **State Tracking**: Visual feedback for accepting/rejecting states

## Installation

### For Moodle with H5P Plugin

1. **Prepare the H5P package**:
   ```bash
   cd /Users/tk/code/moodle-tm
   zip -r H5P.TuringMachine-1.0.h5p H5P.TuringMachine/
   ```

2. **Install in Moodle**:
   - Log in to your Moodle site as an administrator
   - Navigate to: Site administration → Plugins → Activity modules → H5P → Manage H5P content types
   - Click "Upload H5P Content Type"
   - Select the `H5P.TuringMachine-1.0.h5p` file
   - Click "Upload"

3. **Add to a course**:
   - Turn editing on in any course
   - Click "Add an activity or resource"
   - Select "Interactive Content (H5P)"
   - In the editor, choose "Turing Machine Simulator" from the content type list
   - Configure and save

### Alternative: Development Installation

For development or testing in a local H5P installation:

```bash
# Navigate to your H5P libraries directory
cd /path/to/moodle/mod/hvp/libraries/

# Copy the library
cp -r /Users/tk/code/moodle-tm/H5P.TuringMachine ./

# Or create a symbolic link
ln -s /Users/tk/code/moodle-tm/H5P.TuringMachine ./
```

## Transition Function Format

The transition function uses the following notation:

```
currentState, readSymbol > nextState, writeSymbol, Direction
```

Where:
- **currentState**: The current state of the machine (e.g., q0, q1, q2)
- **readSymbol**: The symbol currently under the tape head
- **nextState**: The state to transition to
- **writeSymbol**: The symbol to write on the tape
- **Direction**: Head movement direction
  - `L` - Move left
  - `R` - Move right
  - `N` - No movement (stay)

### Example Transitions

```
q0, 0 > q0, 0, R
q0, 1 > q1, 1, R
q1, 0 > q1, 0, R
q1, 1 > q1, 1, R
q1, _ > q_accept, _, N
```

## Example Turing Machines

Several example machines are provided in the `examples/` directory:

### 1. Binary Counter (`binary-counter.tm`)
Increments a binary number by one.

### 2. Palindrome Checker (`palindrome-checker.tm`)
Checks if the input is a palindrome.

### 3. Unary Adder (`unary-adder.tm`)
Adds two unary numbers separated by '#'.

### 4. Binary Duplicator (`binary-duplicator.tm`)
Duplicates a binary string.

## Usage Guide

### Creating a Simple TM

1. **Define the input**:
   - Enter your input string in the "Input Tape" field
   - Example: `1101` for a binary number

2. **Define transitions**:
   - One transition per line
   - Follow the format: `q0, 0 > q1, 1, R`
   - Use `_` for blank symbol

3. **Define accepting states**:
   - Comma-separated list
   - Example: `q_accept, qf`

4. **Test your machine**:
   - Click "Reset" to initialize
   - Use "Step Forward" to execute one step at a time
   - Or click "Run" to execute automatically
   - Click "Pause" to stop automatic execution
   - Use "Step Back" to review previous states

### Saving and Loading

- **Save**: Click "💾 Save to File" to download a `.tm` file
- **Load**: Click "📂 Load from File" to upload a previously saved definition

## File Format (.tm)

The `.tm` file format is a simple text format:

```
# Turing Machine Definition
# Format: currentState, readSymbol > nextState, writeSymbol, Direction

[Transitions]
q0, 0 > q0, 0, R
q0, 1 > q1, 1, R
q1, _ > q_accept, _, N

[Accepting States]
q_accept

[Input]
101
```

## Technical Details

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dependencies
- H5P.jQuery (included in H5P core)
- H5P framework 1.24+

### File Structure
```
H5P.TuringMachine/
├── library.json          # H5P library metadata
├── semantics.json        # Content type configuration
├── turing-machine.js     # Main JavaScript logic
└── turing-machine.css    # Styles
```

## Educational Use Cases

1. **Introduction to Computation Theory**
   - Demonstrate basic TM concepts
   - Show how TMs accept/reject strings

2. **Algorithm Design**
   - Design TMs for specific problems
   - Compare different solutions

3. **Complexity Analysis**
   - Count steps for different inputs
   - Analyze time complexity

4. **Problem Solving**
   - Implement classic TM algorithms
   - Debug and test solutions

## Troubleshooting

### Machine doesn't halt
- Check for missing transitions
- Verify accepting states are reachable
- Use "Step Forward" to debug

### Transitions not working
- Verify format: `state, symbol > state, symbol, Direction`
- Check for extra spaces or typos
- Ensure Direction is L, R, or N

### File won't load
- Check file has `.tm` extension
- Verify file format matches specification
- Try creating a new file from scratch

## License

MIT License - Feel free to use and modify for educational purposes.

## Contributing

Contributions welcome! Please submit issues or pull requests.

## Credits

Created for educational use in Moodle LMS environments.
