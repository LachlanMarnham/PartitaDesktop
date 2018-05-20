from os.path import abspath
import sys

# This file adds the root of the project to the python import path.
# We will import it into test files so they can be run as __main__
project_root_dir = abspath('..')
sys.path.insert(0, project_root_dir)
