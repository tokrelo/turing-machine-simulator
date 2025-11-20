# Turing Machine Simulator for Moodle

A standalone, self-contained Turing Machine simulator designed for educational use in Moodle learning management systems.

## Features

- **Interactive Tape Display**: Visual representation of the Turing Machine tape with active cell highlighting
- **Step-by-Step Execution**: Control buttons for step back, run, pause, step forward, and reset
- **State Visualization**: Current state displayed with an arrow indicator above the tape
- **Transition Function Editor**: Define state transitions using the format `q0, x > q1, y, D`
- **File Operations**: Save and load machine definitions to/from `.tm` files
- **Speed Control**: Adjustable execution speed (1-10 steps per second)
- **Persistent Status Messages**: Always shows current status (Ready/Running/Accepted/Rejected)
- **Example Machines**: Built-in examples including:
  - Binary counter (increment)
  - Palindrome checker
  - Unary adder
  - Replace zeros with ones
  - Detect "111" pattern
  - Equal zeros and ones
  - 0^n 1^n (equal 0s then 1s)
  - a^n b^n c^n

## Installation in Moodle

### Option 1: As a File (Simplest)

1. In your course, click **"Bearbeiten einschalten"** (Turn editing on)
2. Click **"Material oder Aktivität anlegen"** → **"Datei"** (Add an activity → File)
3. Upload `turing-machine-standalone.html`
4. Under **"Darstellung"** → **"Anzeige"** select **"In neuem Fenster öffnen"** (Open in new window)
5. Save

Students click the link and the simulator opens in a new window.

### Option 2: Embedded with iFrame (Best Integration)

1. In your course, click **"Bearbeiten einschalten"** (Turn editing on)
2. Click **"Material oder Aktivität anlegen"** → **"Textfeld"** (Add an activity → Text field)
3. Upload `turing-machine-standalone.html` to your course files
4. In the text editor, click **"HTML-Quellcode bearbeiten"** (`<>` icon)
5. Insert this code:
   ```html
   <iframe src="@@PLUGINFILE@@/turing-machine-standalone.html" 
           width="100%" 
           height="900" 
           style="border: 1px solid #ccc; border-radius: 5px;">
   </iframe>
   ```
6. Exit HTML mode, upload the file via the file icon in the editor
7. Save

The simulator will be displayed directly in your course.

## Usage

1. **Define Input**: Enter the initial tape content in the Input Tape field
2. **Set Transitions**: Define state transitions in the format:
   ```
   q0, 0 > q1, 1, R
   q0, 1 > q2, 0, L
   ```
   Where:
   - `q0` = current state
   - `0` = symbol to read
   - `q1` = next state
   - `1` = symbol to write
   - `R/L/N` = direction (Right/Left/None)

3. **Set Accepting States**: List accepting states (comma-separated)
4. **Control Execution**:
   - **Step Forward**: Execute one transition
   - **Step Back**: Undo last transition
   - **Run**: Execute continuously at selected speed
   - **Pause**: Stop continuous execution
   - **Reset**: Return to initial state

5. **File Operations**:
   - **Save to File**: Export machine definition as `.tm` file
   - **Load from File**: Import machine definition
   - **Load Example**: Select from built-in examples

## File Format

`.tm` files use this format:

```
# Turing Machine Definition

[Transitions]
q0, 0 > q0, 0, R
q0, 1 > q0, 1, R
q0, _ > q1, _, L

[Accepting States]
q_accept

[Input]
1101
```

## Technical Details

- Pure HTML/CSS/JavaScript - no external dependencies
- ES5 JavaScript for maximum browser compatibility
- Fully self-contained in a single HTML file
- Works in any modern browser
- Responsive design for mobile and desktop

## Files

- `turing-machine-standalone.html` - Complete simulator (upload this to Moodle)
- `README.md` - This file

## License

Educational use allowed. Feel free to modify and distribute.

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
