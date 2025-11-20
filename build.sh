#!/bin/bash

# Installation script for H5P Turing Machine Simulator
# This script creates the H5P package for upload to Moodle

echo "========================================="
echo "H5P Turing Machine Simulator - Packager"
echo "========================================="
echo ""

# Check if we're in the correct directory
if [ ! -d "H5P.TuringMachine" ]; then
    echo "Error: H5P.TuringMachine directory not found!"
    echo "Please run this script from the moodle-tm directory."
    exit 1
fi

# Check if required files exist
required_files=(
    "H5P.TuringMachine/library.json"
    "H5P.TuringMachine/semantics.json"
    "H5P.TuringMachine/turing-machine.js"
    "H5P.TuringMachine/turing-machine.css"
    "h5p.json"
    "content/content.json"
)

echo "Checking required files..."
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "Error: Required file missing: $file"
        exit 1
    fi
    echo "  ✓ $file"
done

echo ""
echo "Creating H5P package..."

# Remove old package if exists
if [ -f "H5P.TuringMachine-1.0.h5p" ]; then
    echo "Removing old package..."
    rm "H5P.TuringMachine-1.0.h5p"
fi

# Create the H5P package (it's just a zip file)
# Include h5p.json, content/, and H5P.TuringMachine/
zip H5P.TuringMachine-1.0.h5p h5p.json
cd H5P.TuringMachine
zip -r ../H5P.TuringMachine-1.0.h5p * -x "*.DS_Store"
cd ../content
zip ../H5P.TuringMachine-1.0.h5p content.json
cd ..

if [ -f "H5P.TuringMachine-1.0.h5p" ]; then
    echo ""
    echo "========================================="
    echo "✓ Package created successfully!"
    echo "========================================="
    echo ""
    echo "Package: H5P.TuringMachine-1.0.h5p"
    echo "Size: $(du -h H5P.TuringMachine-1.0.h5p | cut -f1)"
    echo ""
    echo "Installation Steps:"
    echo "1. Log in to Moodle as administrator"
    echo "2. Navigate to: Site administration → Plugins → Activity modules → H5P"
    echo "3. Click 'Manage H5P content types'"
    echo "4. Upload H5P.TuringMachine-1.0.h5p"
    echo ""
    echo "Or for development/testing:"
    echo "• Open test.html in a web browser"
    echo "• Copy H5P.TuringMachine folder to your Moodle libraries directory"
    echo ""
else
    echo "Error: Failed to create package!"
    exit 1
fi
