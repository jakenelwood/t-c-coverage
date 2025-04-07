#!/bin/bash

# Exit on error
set -e

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install test dependencies
pip install -r requirements-test.txt

# Install Playwright and its dependencies
pip install playwright
playwright install

# Run tests with coverage
pytest tests/ -v --cov=app --cov-report=term-missing

# Deactivate virtual environment
deactivate 