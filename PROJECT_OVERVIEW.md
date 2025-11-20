# Project Overview - H5P Turing Machine Simulator

## 📋 Project Summary

This project provides a complete, interactive Turing Machine simulator as an H5P content type for Moodle. It's designed for educational use in computer science courses covering formal languages, automata theory, and computability.

## 🎯 Features Implemented

### Core Functionality
✅ Visual tape display with current state and position  
✅ Interactive controls (Step Back, Run, Pause, Step Forward, Reset)  
✅ Editable input tape  
✅ Transition function editor with specified format: `q0, x > q1, y, D`  
✅ Accepting states configuration  
✅ Save/Load functionality for .tm files  

### User Interface
✅ Clean, modern design with color-coded feedback  
✅ Real-time tape visualization  
✅ State highlighting on active cell  
✅ Status messages (Accept/Reject/Running/Info)  
✅ Responsive layout for mobile devices  

### Educational Features
✅ Step-by-step execution for learning  
✅ History tracking for stepping backward  
✅ Automatic execution mode  
✅ Multiple example machines included  
✅ Comprehensive documentation  

## 📁 File Structure

```
moodle-tm/
├── H5P.TuringMachine/              # Main H5P content type
│   ├── library.json                # H5P metadata and dependencies
│   ├── semantics.json              # Content configuration schema
│   ├── turing-machine.js           # Core simulator logic (~500 lines)
│   ├── turing-machine.css          # Styling (~250 lines)
│   └── icon.svg                    # Content type icon
│
├── examples/                       # Example Turing Machines
│   ├── binary-counter.tm           # Increment binary number
│   ├── palindrome-checker.tm       # Check if palindrome
│   ├── unary-adder.tm             # Add unary numbers
│   ├── binary-duplicator.tm        # Duplicate binary string
│   ├── equal-zeros-ones.tm         # Check equal 0s and 1s
│   ├── replace-zeros.tm            # Simple replacement
│   └── triple-ones.tm              # Detect "111" pattern
│
├── README.md                       # Main documentation
├── QUICKSTART.md                   # Getting started guide
├── ADVANCED_EXAMPLES.md            # Detailed example explanations
├── build.sh                        # Package builder script
└── test.html                       # Standalone test page
```

## 🚀 Installation Methods

### Method 1: Upload to Moodle (Recommended)
1. Run `./build.sh` to create H5P package
2. Upload `H5P.TuringMachine-1.0.h5p` through Moodle admin
3. Use in any course as H5P activity

### Method 2: Development/Testing
1. Open `test.html` in a web browser
2. Test all functionality standalone
3. Load example .tm files from examples/

### Method 3: Direct Installation
1. Copy `H5P.TuringMachine/` to Moodle's H5P libraries folder
2. Access through Moodle's H5P content type selector

## 🎓 Educational Applications

### Introductory Courses
- Demonstrate basic Turing Machine concepts
- Visualize state transitions
- Show accept/reject behavior

### Advanced Courses
- Design complex algorithms
- Analyze computational complexity
- Explore Church-Turing thesis

### Assignments
- Implement specific TM algorithms
- Debug existing machines
- Optimize for fewer states/steps

## 🔧 Technical Details

### Technologies Used
- **H5P Framework**: Content type foundation
- **JavaScript (ES5)**: Cross-browser compatibility
- **jQuery**: DOM manipulation (H5P dependency)
- **CSS3**: Modern styling with animations

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers supported

### Performance
- Lightweight (~50KB total)
- Fast execution (500ms per step in Run mode)
- Handles tapes up to ~1000 cells efficiently

## 📝 Transition Format Specification

### Syntax
```
currentState, readSymbol > nextState, writeSymbol, Direction
```

### Parameters
- **currentState**: String identifier (e.g., q0, q1, q_start)
- **readSymbol**: Single character currently under head
- **nextState**: State to transition to
- **writeSymbol**: Character to write on tape
- **Direction**: L (left), R (right), or N (no move)

### Example
```
q0, 0 > q1, 1, R    # Read 0, write 1, move right, go to q1
q1, 1 > q1, 1, R    # Read 1, keep 1, move right, stay in q1
q1, _ > q2, _, L    # Read blank, keep blank, move left, go to q2
```

### Comments
Lines starting with `#` are ignored

## 🎨 Customization Options

### Visual Customization
Edit `turing-machine.css`:
- Tape cell size (`.tm-cell`)
- Color scheme (various classes)
- Animation speed (transitions)

### Behavioral Customization
Edit `turing-machine.js`:
- Step execution speed (line ~420: `500` ms)
- Tape expansion behavior
- Default symbols

### Content Defaults
Edit `semantics.json`:
- Default welcome message
- Default transitions
- Default accepting states

## 🧪 Testing

### Unit Testing Checklist
✅ Load from .tm file  
✅ Save to .tm file  
✅ Step forward execution  
✅ Step backward (undo)  
✅ Continuous run mode  
✅ Pause functionality  
✅ Reset to initial state  
✅ Accept state detection  
✅ Reject state detection  
✅ Tape expansion (left/right)  
✅ Blank symbol handling  
✅ Invalid transition handling  

### Test Files Provided
All examples in `examples/` directory can be used for testing

## 📚 Documentation Files

1. **README.md** - Complete installation and usage guide
2. **QUICKSTART.md** - 5-minute getting started guide
3. **ADVANCED_EXAMPLES.md** - Detailed algorithm explanations
4. **Comments in code** - Inline documentation

## 🤝 Usage Tips

### For Instructors
- Start with simple examples (replace-zeros.tm)
- Progress to complex machines (palindrome-checker.tm)
- Use step-by-step mode for demonstrations
- Assign machine design as homework

### For Students
- Load examples first to understand format
- Use step-by-step to debug your machines
- Save your work frequently
- Test with multiple inputs

### Common Patterns
See ADVANCED_EXAMPLES.md for:
- Moving to end of tape
- Mark and find patterns
- Accept/reject strategies
- State naming conventions

## 🐛 Known Limitations

1. No multi-track tapes
2. No non-determinism
3. Limited to standard TM model (not UTM)
4. Performance degrades with very long tapes (>1000 cells)

These are intentional simplifications for educational clarity.

## 🔄 Future Enhancement Ideas

- [ ] Visualization of state diagram
- [ ] Step counter and statistics
- [ ] Multiple tape support
- [ ] Execution speed control slider
- [ ] Transition table view
- [ ] Export to LaTeX/images
- [ ] Sharing via URL parameters
- [ ] Gallery of community machines

## 📄 License

MIT License - Free for educational use

## 🙏 Acknowledgments

Built with:
- H5P Framework (https://h5p.org)
- Moodle LMS (https://moodle.org)
- jQuery (https://jquery.com)

## 📞 Support

For issues or questions:
1. Check documentation (README.md, QUICKSTART.md)
2. Review examples in examples/
3. Test with test.html standalone version
4. Verify file format matches specification

## ✨ Quick Start Command

```bash
# Build and test in one go
./build.sh && open test.html
```

---

**Version**: 1.0  
**Last Updated**: November 2025  
**Status**: Production Ready ✅
