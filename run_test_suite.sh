#!/bin/bash

# Exit on error
set -e

echo "Setting up test environment..."

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install test dependencies
echo "Installing test dependencies..."
pip install -r requirements-test.txt

# Create necessary directories
mkdir -p app/templates
mkdir -p app/output/auto
mkdir -p app/output/home
mkdir -p app/output/specialty

# Run the test suite
echo "Running test suite..."
python run_tests.py

# Deactivate virtual environment
deactivate

echo "Test suite completed. Check test_results.log for detailed results." 