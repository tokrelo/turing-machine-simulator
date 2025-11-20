# Visual Interface Guide

## Main Components

```
┌─────────────────────────────────────────────────────────┐
│           Turing Machine Simulator                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  [Status Message Area - colored background]             │
│  "ACCEPTED - Machine halted in accepting state: q_accept"│
│                                                          │
├─────────────────────────────────────────────────────────┤
│              Tape Display Section                        │
│                                                          │
│           Current State: q1                              │
│                                                          │
│     ┌───┬───┬───┬───┬───┬───┬───┐                      │
│     │ 0 │ 1 │ 1 │ 0 │ 1 │ _ │ _ │                      │
│     └───┴─↓─┴───┴───┴───┴───┴───┘                      │
│           q1                                             │
│                                                          │
│  (Active cell highlighted in yellow with arrow)          │
│                                                          │
├─────────────────────────────────────────────────────────┤
│                   Controls                               │
│                                                          │
│  [⏮ Step Back] [▶ Run] [⏸ Pause] [⏭ Step Forward] [🔄 Reset] │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Input Tape:                                            │
│  ┌───────────────────────────────────────────────────┐ │
│  │ 101                                                │ │
│  └───────────────────────────────────────────────────┘ │
│  Enter the initial content of the tape                  │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  State Transition Function:                             │
│  ┌───────────────────────────────────────────────────┐ │
│  │ q0, 0 > q0, 1, R                                   │ │
│  │ q0, 1 > q0, 1, R                                   │ │
│  │ q0, _ > q_accept, _, N                             │ │
│  │                                                     │ │
│  │                                                     │ │
│  └───────────────────────────────────────────────────┘ │
│  Format: currentState, readSymbol > nextState,          │
│          writeSymbol, Direction (L/R/N)                 │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  Accepting States:                                      │
│  ┌───────────────────────────────────────────────────┐ │
│  │ q_accept                                           │ │
│  └───────────────────────────────────────────────────┘ │
│  Comma-separated list of accepting states               │
│                                                          │
├─────────────────────────────────────────────────────────┤
│  [💾 Save to File]  [📂 Load from File]                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Color Scheme

### Tape Display
- **White cells**: Normal tape cells
- **Yellow highlighted**: Current head position (active cell)
- **Red border**: Active cell border
- **Gray background**: Tape container background

### Status Messages
- 🟢 **Green**: Accepted (success)
- 🔴 **Red**: Rejected (error)
- 🔵 **Blue**: Information messages
- 🟡 **Yellow**: Running status

### Buttons
- **Blue buttons**: Main controls (Run, Reset)
- **Purple buttons**: Step controls (Step Back, Step Forward)
- **Orange buttons**: Pause button
- **Green buttons**: File operations (Save, Load)

## Control Button States

### Enabled States
```
Normal State:
[⏮ Step Back]  [▶ Run]  [⏸ Pause]  [⏭ Step Forward]  [🔄 Reset]
   enabled      enabled   disabled      enabled          enabled

Running State:
[⏮ Step Back]  [▶ Run]  [⏸ Pause]  [⏭ Step Forward]  [🔄 Reset]
   disabled     disabled  enabled       disabled         enabled

Halted State:
[⏮ Step Back]  [▶ Run]  [⏸ Pause]  [⏭ Step Forward]  [🔄 Reset]
   enabled      disabled disabled      disabled         enabled
```

## Tape Visualization Examples

### Example 1: Simple Binary String
```
Input: 101

                Current State: q0
                
    ┌───┬───┬───┐
    │ 1 │ 0 │ 1 │
    └─↓─┴───┴───┘
      q0
```

### Example 2: After Processing
```
Processing: Replace all 0s with 1s

                Current State: q0
                
    ┌───┬───┬───┬───┐
    │ 1 │ 1 │ 1 │ _ │
    └───┴───┴───┴─↓─┘
                  q0
```

### Example 3: Extended Tape
```
Tape extended during processing

                Current State: q2
                
    ┌───┬───┬───┬───┬───┬───┬───┬───┐
    │ _ │ 0 │ 1 │ 1 │ 0 │ X │ Y │ 1 │
    └───┴───┴───┴───┴─↓─┴───┴───┴───┘
                      q2
```

## Status Message Examples

### Success (Accept)
```
┌─────────────────────────────────────────────────────┐
│ ✓ ACCEPTED - Machine halted in accepting state: q_accept │
└─────────────────────────────────────────────────────┘
Background: Light green (#d4edda)
Text: Dark green (#155724)
```

### Failure (Reject)
```
┌─────────────────────────────────────────────────────┐
│ ✗ REJECTED - No transition defined for state "q1"   │
│   with symbol "0"                                    │
└─────────────────────────────────────────────────────┘
Background: Light red (#f8d7da)
Text: Dark red (#721c24)
```

### Running
```
┌─────────────────────────────────────────────────────┐
│ ⚡ Running...                                        │
└─────────────────────────────────────────────────────┘
Background: Light yellow (#fff3cd)
Text: Dark yellow (#856404)
```

### Information
```
┌─────────────────────────────────────────────────────┐
│ ℹ Machine reset                                     │
└─────────────────────────────────────────────────────┘
Background: Light blue (#d1ecf1)
Text: Dark blue (#0c5460)
```

## Transition Editor Format

### Correct Format Examples
```
✓ q0, 0 > q1, 1, R
✓ q1, 1 > q2, 0, L
✓ q2, _ > q_accept, _, N
✓ start, a > middle, b, R
```

### Incorrect Format Examples (Won't Parse)
```
✗ q0 0 > q1 1 R          (missing commas)
✗ q0, 0 -> q1, 1, R      (wrong arrow)
✗ q0, 0 > q1, 1, RIGHT   (wrong direction format)
✗ q0, 0 > q1, 1          (missing direction)
```

## File Format (.tm) Visual

```
┌─────────────────────────────────────────────┐
│ # Turing Machine Definition                 │
│ # Format: currentState, readSymbol >        │
│ #         nextState, writeSymbol, Direction │
│                                              │
│ [Transitions]                                │
│ q0, 0 > q0, 1, R                            │
│ q0, 1 > q0, 1, R                            │
│ q0, _ > q_accept, _, N                      │
│                                              │
│ [Accepting States]                           │
│ q_accept                                     │
│                                              │
│ [Input]                                      │
│ 101                                          │
└─────────────────────────────────────────────┘
```

## Responsive Design

### Desktop View (> 768px)
- Full width controls
- Large tape cells (50x50px)
- All buttons in single row

### Mobile View (< 768px)
- Stacked controls
- Smaller tape cells (40x40px)
- Buttons may wrap to multiple rows
- Horizontal scrolling for long tapes

## Interaction Flow

```
1. User enters/loads definition
   ↓
2. Click "Reset" to initialize
   ↓
3. Choose execution mode:
   ├─→ "Step Forward" for manual control
   ├─→ "Run" for automatic execution
   └─→ "Step Back" to review previous states
   ↓
4. Machine executes until:
   ├─→ Accepting state reached (ACCEPT)
   ├─→ No transition found (REJECT)
   └─→ User clicks "Pause"
   ↓
5. View result in status message
   ↓
6. Save machine definition if desired
```

## Keyboard Shortcuts (Future Enhancement)
Currently not implemented, but could add:
- Space: Run/Pause toggle
- → (Right arrow): Step Forward
- ← (Left arrow): Step Back
- R: Reset
- S: Save

## Accessibility Features
- Color + Text for status (not color alone)
- Large click targets (buttons)
- Clear visual hierarchy
- Readable fonts and sizes
- High contrast color scheme

## Animation Details
- Button hover: Slight lift effect (2px)
- Active cell: Subtle glow (box-shadow)
- Status messages: Fade out after 3 seconds (info only)
- Transition speed: 0.3s for smooth effects

---

This visual guide helps users understand the interface layout and behavior without needing to run the application first.
