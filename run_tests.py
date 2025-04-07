#!/usr/bin/env python3
import unittest
import logging
import sys
from datetime import datetime
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def run_tests():
    """Run all test suites and return overall success status."""
    start_time = datetime.now()
    logger.info(f"Starting test suite at {start_time}")
    
    # Test suites to run
    test_suites = [
        'tests.test_document_generation',
        'tests.test_api_integration',
        'tests.test_authentication',
        'tests.test_template_validation',
        'tests.test_frontend',
        'tests.test_performance'
    ]
    
    # Run tests and collect results
    success = True
    for suite_name in test_suites:
        try:
            logger.info(f"Running test suite: {suite_name}")
            suite = unittest.defaultTestLoader.loadTestsFromName(suite_name)
            runner = unittest.TextTestRunner(verbosity=2)
            result = runner.run(suite)
            
            if not result.wasSuccessful():
                success = False
                logger.error(f"Test suite {suite_name} failed")
                logger.error(f"Failures: {len(result.failures)}")
                logger.error(f"Errors: {len(result.errors)}")
                
                for failure in result.failures:
                    logger.error(f"Failure in {failure[0]}: {failure[1]}")
                for error in result.errors:
                    logger.error(f"Error in {error[0]}: {error[1]}")
            
        except Exception as e:
            success = False
            logger.error(f"Error running test suite {suite_name}: {str(e)}")
    
    end_time = datetime.now()
    duration = end_time - start_time
    logger.info(f"Test suite completed in {duration}")
    
    return success

if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1) 