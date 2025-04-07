#!/bin/bash

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-test.txt

# Create necessary directories
mkdir -p tests/templates
mkdir -p tests/output

# Run tests
python run_tests.py

# Deactivate virtual environment
deactivate 